import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

function sanitize(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type ErrorCode =
  | 'FORBIDDEN'
  | 'RATE_LIMITED'
  | 'INVALID_BODY'
  | 'REQUIRED_FIELDS'
  | 'NAME_TOO_LONG'
  | 'INVALID_EMAIL'
  | 'MESSAGE_TOO_LONG'
  | 'SERVER_CONFIG'
  | 'SEND_FAILED';

/**
 * Responds with a stable error code rather than a localized string, so the
 * client can render it in the active locale.
 */
function fail(
  code: ErrorCode,
  status: number,
  extra?: Record<string, number>,
  headers?: Record<string, string>,
) {
  return NextResponse.json({ error: code, ...extra }, { status, headers });
}

export async function POST(request: NextRequest) {
  // --- Origin check ---
  const origin = request.headers.get('origin');
  const allowedHosts = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter(Boolean) as string[];

  const isLocalhost = origin?.includes('localhost') || origin?.includes('127.0.0.1');
  const isAllowedOrigin = allowedHosts.some((host) => origin === host);

  if (!isLocalhost && !isAllowedOrigin) {
    return fail('FORBIDDEN', 403);
  }

  // --- Rate limiting ---
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0].trim() ?? 'unknown';
  const { allowed, retryAfterSeconds } = rateLimit(ip);

  if (!allowed) {
    return fail(
      'RATE_LIMITED',
      429,
      { seconds: retryAfterSeconds },
      { 'Retry-After': String(retryAfterSeconds) },
    );
  }

  // --- Parse body ---
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('INVALID_BODY', 400);
  }

  // --- Honeypot ---
  // Bots that fill the hidden field get a fake success so they cannot detect the trap.
  if (body.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = typeof body.name === 'string' ? sanitize(body.name) : '';
  const email = typeof body.email === 'string' ? sanitize(body.email) : '';
  const message = typeof body.message === 'string' ? sanitize(body.message) : '';

  // --- Validation ---
  if (!name || !email || !message) {
    return fail('REQUIRED_FIELDS', 400);
  }

  if (name.length > MAX_NAME_LENGTH) {
    return fail('NAME_TOO_LONG', 400, { max: MAX_NAME_LENGTH });
  }

  if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
    return fail('INVALID_EMAIL', 400);
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return fail('MESSAGE_TOO_LONG', 400, { max: MAX_MESSAGE_LENGTH });
  }

  // --- Environment check ---
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!process.env.RESEND_API_KEY || !contactEmail) {
    console.error('Missing RESEND_API_KEY or CONTACT_EMAIL environment variable.');
    return fail('SERVER_CONFIG', 500);
  }

  // --- Send email ---
  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: contactEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Resend error:', err);
    return fail('SEND_FAILED', 500);
  }
}
