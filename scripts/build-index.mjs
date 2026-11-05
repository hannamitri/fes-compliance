// Collects data/reviews/*.json into src/generated/reviews.json (sorted newest first).
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "data", "reviews");
const out = join(process.cwd(), "src", "generated");
mkdirSync(out, { recursive: true });
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
const reviews = files.map((f) => {
  const r = JSON.parse(readFileSync(join(dir, f), "utf8"));
  if (!r.id || !r.source || !r.closer || !r.findings) throw new Error(`bad review ${f}`);
  return r;
});
reviews.sort((a, b) => (a.date < b.date ? 1 : -1));
writeFileSync(join(out, "reviews.json"), JSON.stringify(reviews, null, 0));
console.log(`indexed ${reviews.length} reviews`);
