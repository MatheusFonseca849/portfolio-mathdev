interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

const WINDOW_MS = 30 * 60 * 1000; // 30 minutes

/** Deliberately strict */
const MAX_SENDS = 2;

/** Requests that reach the handler at all. Guards CPU */
const MAX_ATTEMPTS = 20;

const sendStore = new Map<string, RateLimitEntry>();
const attemptStore = new Map<string, RateLimitEntry>();

const ALLOWED: RateLimitResult = { allowed: true, retryAfterSeconds: 0 };

function prune(store: Map<string, RateLimitEntry>, now: number) {
  if (store.size <= 10_000) return;
  for (const [key, val] of store) {
    if (now > val.resetAt) store.delete(key);
  }
}

function blocked(entry: RateLimitEntry, now: number): RateLimitResult {
  return {
    allowed: false,
    retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
  };
}

/** Read-only quota check */
function peek(store: Map<string, RateLimitEntry>, ip: string, max: number): RateLimitResult {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) return ALLOWED;
  if (entry.count >= max) return blocked(entry, now);

  return ALLOWED;
}

/** Consumes one unit of budget, returning whether the caller was within quota. */
function hit(store: Map<string, RateLimitEntry>, ip: string, max: number): RateLimitResult {
  const now = Date.now();
  prune(store, now);

  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return ALLOWED;
  }

  if (entry.count >= max) return blocked(entry, now);

  entry.count += 1;
  return ALLOWED;
}

/** Call once per request, before doing any work. */
export function recordAttempt(ip: string): RateLimitResult {
  return hit(attemptStore, ip, MAX_ATTEMPTS);
}

/**
 * Checks the send quota without consuming it, so that a validation error
 * (e.g. a typo'd email) does not cost the visitor one of their few sends.
 */
export function checkSendQuota(ip: string): RateLimitResult {
  return peek(sendStore, ip, MAX_SENDS);
}

/** Call only once an email has actually been dispatched. */
export function recordSend(ip: string): void {
  hit(sendStore, ip, MAX_SENDS);
}
