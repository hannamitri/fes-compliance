import reviewsJson from "@/generated/reviews.json";
import type { Review, Severity, Verdict } from "./types";

export const reviews = reviewsJson as unknown as Review[];

export function getReview(id: string): Review | undefined {
  return reviews.find((r) => r.id === id);
}

export function closers() {
  const map = new Map<string, Review[]>();
  for (const r of reviews) {
    const k = r.closer.email;
    map.set(k, [...(map.get(k) ?? []), r]);
  }
  return [...map.entries()]
    .map(([email, rs]) => ({ email, name: rs[0].closer.name, reviews: rs }))
    .sort((a, b) => b.reviews.length - a.reviews.length);
}

export function countBySeverity(rs: Review[]) {
  const c: Record<Severity, number> = { high: 0, medium: 0, low: 0 };
  for (const r of rs) for (const f of r.findings) c[f.severity]++;
  return c;
}

export function countByVerdict(rs: Review[]) {
  const c: Record<Verdict, number> = { serious: 0, issues: 0, clean: 0 };
  for (const r of rs) c[r.verdict]++;
  return c;
}

export function ruleCounts(rs: Review[]) {
  const c = new Map<string, number>();
  for (const r of rs)
    for (const f of r.findings)
      for (const id of f.rules) c.set(id, (c.get(id) ?? 0) + 1);
  return [...c.entries()].sort((a, b) => b[1] - a[1]);
}
