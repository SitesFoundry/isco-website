/**
 * Email anti-scraping protection utilities
 * 
 * Strategy: 
 * 1. Never put real email in HTML source / DOM text directly
 * 2. Use base64 encoding + JS decoding at runtime
 * 3. Only reveal real mailto: link on user click
 */

// Encode email parts separately to avoid pattern matching
const _p1 = 'c2FsZXM='; // base64 of 'sales'
const _p2 = 'aXNjb2dtYmguY29t'; // base64 of 'iscogmbh.com'

function _d(s: string): string {
  return atob(s);
}

/**
 * Get the display version of the email (obfuscated for screen readers / bots)
 * Shows: sales [at] iscogmbh [dot] com
 */
export function getEmailDisplay(): string {
  return `${_d(_p1)} [at] ${_d(_p2).replace('.', ' [dot] ')}`;
}

/**
 * Get the real email address (only call on user interaction)
 */
export function getEmailReal(): string {
  return `${_d(_p1)}@${_d(_p2)}`;
}

/**
 * Open mailto link (only on explicit user click)
 */
export function openMailto(subject?: string, body?: string): void {
  const email = getEmailReal();
  let href = `mailto:${email}`;
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  if (params.length > 0) href += `?${params.join('&')}`;
  window.location.href = href;
}
