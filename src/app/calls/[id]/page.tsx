import Link from "next/link";
import { notFound } from "next/navigation";
import { RuleChip, SeverityPill, SourcePill, VerdictBadge } from "@/components/badges";
import { getReview, reviews, ruleCounts } from "@/lib/data";
import { fmtDate, fmtDuration, fmtTime } from "@/lib/format";
import { RULE_BY_ID } from "@/lib/rules";
import type { Severity } from "@/lib/types";

export function generateStaticParams() {
  return reviews.map((r) => ({ id: r.id }));
}

const ORDER: Severity[] = ["high", "medium", "low"];

export default async function CallPage({ params }: PageProps<"/calls/[id]">) {
  const { id } = await params;
  const r = getReview(id);
  if (!r) notFound();
  const grouped = ORDER.map((s) => ({ s, items: r.findings.filter((f) => f.severity === s) })).filter(
    (g) => g.items.length,
  );
  const rules = ruleCounts([r]);
  const openLabel = r.source === "fathom" ? "Open in Fathom" : "Open in Close";

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-10">
      <div>
        <Link href="/" className="text-xs text-paper-3 hover:text-paper">← All conversations</Link>
        <div className="mt-4 flex flex-wrap items-center gap-3 rise">
          <SourcePill source={r.source} />
          <span className="text-xs text-paper-3">{fmtDate(r.date)}</span>
          {r.durationSec ? <span className="text-xs text-paper-3">· {fmtDuration(r.durationSec)}</span> : null}
          <span className="text-xs text-paper-3">· {r.outcome === "enrolled" ? "Enrolled" : r.outcome === "not-enrolled" ? "Did not enroll" : "Outcome unknown"}</span>
        </div>
        <h1 className="serif text-5xl leading-[0.95] mt-3 text-paper rise" style={{ animationDelay: "60ms" }}>
          {r.closer.name.split(" ")[0]} <span className="text-paper-3">×</span> {r.prospect.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-5 rise" style={{ animationDelay: "120ms" }}>
          <VerdictBadge verdict={r.verdict} size="lg" />
          <a href={r.url} target="_blank" rel="noreferrer" className="text-sm text-gold underline hover:text-paper">
            {openLabel} ↗
          </a>
          {r.closeUrl && (
            <a href={r.closeUrl} target="_blank" rel="noreferrer" className="text-sm text-paper-2 underline hover:text-paper">
              Lead in Close ↗
            </a>
          )}
        </div>

        <section className="mt-8 grid md:grid-cols-2 gap-6 rise" style={{ animationDelay: "160ms" }}>
          <div className="border border-line rounded-lg p-5 bg-ink-2/60">
            <p className="eyebrow mb-2">Summary</p>
            <p className="text-paper-2 leading-relaxed">{r.summary}</p>
          </div>
          <div className="border border-line rounded-lg p-5 bg-ink-2/60">
            <p className="eyebrow mb-2">Coverage</p>
            <p className="text-paper-2 leading-relaxed text-sm">{r.coverage}</p>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="serif text-3xl text-paper">Non-compliant</h2>
            <span className="text-xs text-paper-3">{r.findings.length} finding{r.findings.length === 1 ? "" : "s"}</span>
          </div>
          {r.findings.length === 0 && (
            <div className="border border-line rounded-lg p-6 text-paper-3">No non-compliant statements found.</div>
          )}
          <div className="space-y-4">
            {grouped.map((g) =>
              g.items.map((f, i) => (
                <article
                  key={`${g.s}-${i}`}
                  className="border border-line rounded-lg bg-ink-2/60 p-5 rise"
                  style={{ animationDelay: `${200 + i * 40}ms` }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <SeverityPill severity={f.severity} />
                    {f.link && f.timestamp !== null ? (
                      <a href={f.link} target="_blank" rel="noreferrer" className="text-sm text-gold tabular-nums underline hover:text-paper">
                        {fmtTime(f.timestamp)} ↗
                      </a>
                    ) : f.link ? (
                      <a href={f.link} target="_blank" rel="noreferrer" className="text-sm text-gold underline hover:text-paper">
                        Open ↗
                      </a>
                    ) : (
                      <span className="text-xs text-paper-4">no timestamp</span>
                    )}
                    <span className="flex flex-wrap gap-1.5 ml-auto">
                      {f.rules.map((id) => (
                        <RuleChip key={id} id={id} />
                      ))}
                    </span>
                  </div>
                  <blockquote className="serif text-2xl leading-snug text-paper">
                    “{f.quote}”
                  </blockquote>
                  <p className="mt-3 text-sm text-paper-2 leading-relaxed">{f.note}</p>
                </article>
              )),
            )}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="serif text-3xl text-paper">Compliant</h2>
            <span className="text-xs text-paper-3">{r.compliant.length} item{r.compliant.length === 1 ? "" : "s"}</span>
          </div>
          {r.compliant.length === 0 && (
            <div className="border border-line rounded-lg p-6 text-paper-3">Nothing specifically noted.</div>
          )}
          <ul className="border border-line rounded-lg bg-ink-2/60 divide-y divide-line">
            {r.compliant.map((c, i) => (
              <li key={i} className="p-5 flex gap-4">
                <span className="dot dot-clean mt-2 shrink-0" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-paper">{c.area}</span>
                    {c.link && c.timestamp !== null && (
                      <a href={c.link} target="_blank" rel="noreferrer" className="text-xs text-gold tabular-nums underline">
                        {fmtTime(c.timestamp)} ↗
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-paper-2 mt-1">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="lg:sticky lg:top-8 self-start space-y-6">
        <div className="border border-line rounded-lg p-5 bg-ink-2/60">
          <p className="eyebrow mb-3">Details</p>
          <dl className="text-sm space-y-2">
            <Row k="Closer" v={r.closer.name} />
            <Row k="Email" v={r.closer.email} />
            <Row k="Prospect" v={r.prospect.name} />
            <Row k="Reviewed" v={fmtDate(r.reviewedAt)} />
            <Row k="Reviewer" v={r.reviewer} />
          </dl>
        </div>
        <div className="border border-line rounded-lg p-5 bg-ink-2/60">
          <p className="eyebrow mb-3">Rules hit</p>
          {rules.length === 0 && <p className="text-sm text-paper-3">None</p>}
          <ul className="space-y-2">
            {rules.map(([id, n]) => (
              <li key={id} className="flex items-center justify-between gap-3 text-sm">
                <a href={`/rules#${id}`} className="text-paper-2 hover:text-paper truncate">
                  <span className="text-gold mr-2">{id}</span>
                  {RULE_BY_ID[id]?.name ?? id}
                </a>
                <span className="text-paper-3 tabular-nums">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-paper-3">{k}</dt>
      <dd className="text-paper-2 text-right truncate">{v}</dd>
    </div>
  );
}
