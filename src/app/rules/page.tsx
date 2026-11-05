import { RULES } from "@/lib/rules";
import { reviews, ruleCounts } from "@/lib/data";

export default function RulesPage() {
  const counts = Object.fromEntries(ruleCounts(reviews));
  const internal = RULES.filter((r) => r.source === "internal");
  const audit = RULES.filter((r) => r.source === "ftc-audit");
  return (
    <div>
      <p className="eyebrow mb-3">Rule set</p>
      <h1 className="serif text-5xl text-paper mb-4 rise">What every conversation is checked against.</h1>
      <p className="text-paper-2 max-w-2xl mb-10">
        C-rules are the internal closer checklist. P-rules are sections of the FES FTC Compliance Audit prepared November 5, 2026. Counts show how many findings across all reviews cite each rule.
      </p>
      <Group title="Internal closer checklist" rules={internal} counts={counts} />
      <Group title="FTC compliance audit" rules={audit} counts={counts} />
    </div>
  );
}

function Group({
  title,
  rules,
  counts,
}: {
  title: string;
  rules: typeof RULES;
  counts: Record<string, number>;
}) {
  return (
    <section className="mb-12">
      <h2 className="serif text-3xl text-paper mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {rules.map((r) => (
          <article id={r.id} key={r.id} className="border border-line rounded-lg bg-ink-2/60 p-5 scroll-mt-24">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h3 className="text-paper">
                <span className="text-gold mr-2">{r.id}</span>
                {r.name}
              </h3>
              <span className="text-xs text-paper-3 whitespace-nowrap">
                {r.risk} · {counts[r.id] ?? 0} hit{(counts[r.id] ?? 0) === 1 ? "" : "s"}
              </span>
            </div>
            <ul className="text-sm text-paper-2 space-y-1.5 list-disc pl-4">
              {r.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
