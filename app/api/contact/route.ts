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
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // --- Rate limiting ---
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0].trim() ?? 'unknown';
  const { allowed, retryAfterSeconds } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: `Too many requests. Please try again in ${retryAfterSeconds} seconds.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
    );
  }

  // --- Parse body ---
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // --- Honeypot ---
  if (body.website) {
    return NextResponse.json({ message: 'Message sent successfully.' }, { status: 200 });
  }

  const name = typeof body.name === 'string' ? sanitize(body.name) : '';
  const email = typeof body.email === 'string' ? sanitize(body.email) : '';
  const message = typeof body.message === 'string' ? sanitize(body.message) : '';

  // --- Validation ---
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  if (name.length > MAX_NAME_LENGTH) {
    return NextResponse.json(
      { error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.` },
      { status: 400 },
    );
  }

  if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
      { status: 400 },
    );
  }

  // --- Environment check ---
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!process.env.RESEND_API_KEY || !contactEmail) {
    console.error('Missing RESEND_API_KEY or CONTACT_EMAIL environment variable.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
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

    return NextResponse.json({ message: 'Message sent successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}
