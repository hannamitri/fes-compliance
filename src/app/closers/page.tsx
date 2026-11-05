import Link from "next/link";
import { VerdictBadge, SourcePill } from "@/components/badges";
import { closers, countBySeverity, countByVerdict, ruleCounts } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { RULE_BY_ID } from "@/lib/rules";

export default function ClosersPage() {
  const list = closers();
  return (
    <div>
      <p className="eyebrow mb-3">By closer</p>
      <h1 className="serif text-5xl text-paper mb-10 rise">Patterns, not one-offs.</h1>
      <div className="space-y-8">
        {list.map((c, i) => {
          const v = countByVerdict(c.reviews);
          const s = countBySeverity(c.reviews);
          const top = ruleCounts(c.reviews).slice(0, 5);
          return (
            <section key={c.email} className="border border-line rounded-lg bg-ink-2/60 rise" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-6 p-6 border-b border-line">
                <div>
                  <h2 className="serif text-3xl text-paper">{c.name}</h2>
                  <p className="text-xs text-paper-3 mt-1">{c.email}</p>
                  <p className="text-sm text-paper-2 mt-3">
                    {c.reviews.length} conversation{c.reviews.length === 1 ? "" : "s"} reviewed
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Verdicts</p>
                  <div className="flex gap-5 text-sm">
                    <span className="verdict-serious">{v.serious} serious</span>
                    <span className="verdict-issues">{v.issues} issues</span>
                    <span className="verdict-clean">{v.clean} clean</span>
                  </div>
                  <p className="eyebrow mt-4 mb-2">Flags</p>
                  <div className="flex gap-5 text-sm">
                    <span className="text-high">{s.high} high</span>
                    <span className="text-medium">{s.medium} medium</span>
                    <span className="text-low">{s.low} low</span>
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-2">Most-hit rules</p>
                  <ul className="space-y-1.5 text-sm">
                    {top.map(([id, n]) => (
                      <li key={id} className="flex justify-between gap-3">
                        <a href={`/rules#${id}`} className="text-paper-2 hover:text-paper truncate">
                          <span className="text-gold mr-2">{id}</span>
                          {RULE_BY_ID[id]?.name ?? id}
                        </a>
                        <span className="text-paper-3 tabular-nums">{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <ul className="divide-y divide-line">
                {c.reviews.map((r) => (
                  <li key={r.id}>
                    <Link href={`/calls/${r.id}`} className="row-hover flex flex-wrap items-center gap-4 px-6 py-3">
                      <span className="serif text-lg text-paper w-56 truncate">{r.prospect.name}</span>
                      <SourcePill source={r.source} />
                      <span className="text-xs text-paper-3">{fmtDate(r.date)}</span>
                      <span className="ml-auto"><VerdictBadge verdict={r.verdict} /></span>
                      <span className="text-xs text-paper-3 tabular-nums w-16 text-right">{r.findings.length} flags</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
