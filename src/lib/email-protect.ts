/**
 * Email helpers
 *
 * The address is kept base64-encoded in the source so the literal string does
 * not sit in the bundle for naive scrapers, but visitors always see and get the
 * normal address (sales@iscogmbh.com) - never an "(at)" / "(dot)" spelling.
 */

// Encode email parts separately to avoid pattern matching
const _p1 = 'c2FsZXM='; // base64 of 'sales'
const _p2 = 'aXNjb2dtYmguY29t'; // base64 of 'iscogmbh.com'

function _d(s: string): string {
  return atob(s);
}

/**
 * The address as visitors read it: sales@iscogmbh.com
 */
export function getEmailDisplay(): string {
  return getEmailReal();
}

/**
 * The real email address
 */
export function getEmailReal(): string {
  return `${_d(_p1)}@${_d(_p2)}`;
}

/**
 * Build a mailto: link, optionally with subject and body
 */
export function getEmailHref(subject?: string, body?: string): string {
  let href = `mailto:${getEmailReal()}`;
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  if (params.length > 0) href += `?${params.join('&')}`;
  return href;
}

/**
 * Open the mail client
 */
export function openMailto(subject?: string, body?: string): void {
  window.location.href = getEmailHref(subject, body);
}
