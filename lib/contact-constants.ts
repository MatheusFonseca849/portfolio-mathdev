/**
 * Shared between the contact API route and the client form so the two can't
 * drift apart. Safe to import from either environment: no runtime dependencies.
 */

export const MAX_NAME_LENGTH = 100;
export const MAX_EMAIL_LENGTH = 254;
export const MAX_MESSAGE_LENGTH = 2000;

/**
 * Stable, locale-independent error codes. The API returns one of these and the
 * client renders it in the active locale via the `contact.errors` namespace.
 */
export const ERROR_CODES = [
  'FORBIDDEN',
  'RATE_LIMITED',
  'INVALID_BODY',
  'REQUIRED_FIELDS',
  'NAME_TOO_LONG',
  'INVALID_EMAIL',
  'MESSAGE_TOO_LONG',
  'SERVER_CONFIG',
  'SEND_FAILED',
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

/** Anything outside this set is rendered as the generic UNKNOWN message. */
export const KNOWN_ERROR_CODES: ReadonlySet<string> = new Set(ERROR_CODES);
