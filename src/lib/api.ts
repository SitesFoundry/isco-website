/**
 * Contact form delivery.
 *
 * GitHub Pages is a static host: there is no server to receive a POST. The form
 * is therefore delivered by Formspree (https://formspree.io). The previous
 * Manus/Cloudflare deployment posted to /api/contact, a Cloudflare Pages
 * Function that does not exist here.
 */

/*
 * Paste the endpoint of the Formspree form created for this site. It looks like
 * https://formspree.io/f/xxxxxxxx and appears on the form's page in the
 * Formspree dashboard. Submissions are emailed to whichever address that form
 * was registered to, so register it against the inbox that should receive
 * enquiries (sales@iscogmbh.com).
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzezgbwe";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  language?: string;
}

export async function submitContact(
  data: ContactFormData,
): Promise<{ success: boolean }> {
  if (!FORMSPREE_ENDPOINT) {
    /*
     * Fail loudly rather than silently. A form that reports success while
     * dropping every submission is far worse than one that is visibly not
     * connected yet: the visitor believes they have been heard, and nobody
     * ever finds out that they were not.
     */
    throw new Error(
      "The contact form is not connected yet. Please email sales@iscogmbh.com directly.",
    );
  }

  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    const detail = Array.isArray(err?.errors)
      ? err.errors.map((e: { message?: string }) => e.message).join(", ")
      : "";
    throw new Error(
      detail ||
        `Could not send your message (HTTP ${res.status}). Please email sales@iscogmbh.com directly.`,
    );
  }

  return { success: true };
}
