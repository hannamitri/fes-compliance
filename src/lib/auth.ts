export const COOKIE = "fesc";

export async function token(password: string) {
  const data = new TextEncoder().encode(`fes-compliance:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function sitePassword() {
  return process.env.SITE_PASSWORD ?? "";
}
