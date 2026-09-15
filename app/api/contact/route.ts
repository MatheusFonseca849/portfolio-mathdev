import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  checkSendQuota,
  recordAttempt,
  recordSend,
  type RateLimitResult,
} from '@/lib/rate-limit';
import {
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  type ErrorCode,
} from '@/lib/contact-constants';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Strips angle brackets and control characters, but keeps tabs and newlines so
 * the message body retains its paragraphs. Carriage returns are dropped: a CR
 * surviving into a header is the classic email header injection vector.
 */
function sanitize(input: string): string {
  return input
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim();
}

/** Collapses whitespace; used for values that end up in a header. */
function singleLine(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

/** Origin header values carry no path or trailing slash, so normalise before comparing. */
function normalizeOrigin(value: string): string {
  try {
    return new URL(value).origin;
  } catch {
    return value.replace(/\/+$/, '');
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

/** Keeps the Retry-After header and the JSON payload in agreement. */
function rateLimited(result: RateLimitResult) {
  return fail(
    'RATE_LIMITED',
    429,
    { seconds: result.retryAfterSeconds },
    { 'Retry-After': String(result.retryAfterSeconds) },
  );
}

export async function POST(request: NextRequest) {
  // --- Origin check ---
  // Note: `Origin` is only meaningful for browser traffic; a scripted client
  // sets it freely. This blocks cross-site form posts, not determined abuse,
  // which is what the rate limiter is for.
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    // Localhost is permitted in development only; leaving it enabled in
    // production would let any caller bypass the check with a forged header.
    process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : undefined,
  ]
    .filter((value): value is string => Boolean(value))
    .map(normalizeOrigin);

  const isAllowedOrigin =
    typeof origin === 'string' && allowedOrigins.includes(normalizeOrigin(origin));

  if (!isAllowedOrigin) {
    return fail('FORBIDDEN', 403);
  }

  // --- Rate limiting ---
  const forwarded = request.headers.get('x-forwarded-for');
  const ip =
    forwarded?.split(',')[0].trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'unknown';

  const attempt = recordAttempt(ip);
  if (!attempt.allowed) {
    return rateLimited(attempt);
  }

  // Checked without consuming, so a validation error costs the visitor nothing.
  const sendQuota = checkSendQuota(ip);
  if (!sendQuota.allowed) {
    return rateLimited(sendQuota);
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
    recordSend(ip);
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = typeof body.name === 'string' ? singleLine(sanitize(body.name)) : '';
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

    recordSend(ip);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Resend error:', err);
    return fail('SEND_FAILED', 500);
  }
}
