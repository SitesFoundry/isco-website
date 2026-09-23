/**
 * Lightweight API client for Cloudflare Pages Functions
 */

const API_BASE = "/api";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  language?: string;
}

export async function submitContact(data: ContactFormData): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}
