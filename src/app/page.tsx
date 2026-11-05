import { ConversationTable } from "@/components/conversation-table";
import { countBySeverity, countByVerdict, reviews } from "@/lib/data";

export default function Home() {
  const v = countByVerdict(reviews);
  const s = countBySeverity(reviews);
  const rows = reviews.map((r) => {
    const c = countBySeverity([r]);
    return {
      id: r.id,
      source: r.source,
      title: r.title,
      closer: r.closer,
      prospect: r.prospect,
      date: r.date,
      durationSec: r.durationSec,
      verdict: r.verdict,
      outcome: r.outcome,
      summary: r.summary,
      ...c,
    };
  });
  const last = reviews.reduce((m, r) => (r.reviewedAt > m ? r.reviewedAt : m), "");

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10 rise">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Sales conversations · Fathom + Close</p>
          <h1 className="serif text-5xl md:text-6xl leading-[0.95] text-paper">
            What closers are <em className="text-gold">actually</em> saying.
          </h1>
          <p className="mt-4 max-w-xl text-paper-2">
            Every recorded sales call, text and email is scanned against the internal closer checklist and the FTC compliance audit. Open any row for the exact quotes, timestamps and rules.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden min-w-[320px]">
          <Stat label="Reviewed" value={reviews.length} />
          <Stat label="Serious" value={v.serious} tone="serious" />
          <Stat label="Issues" value={v.issues} tone="issues" />
          <Stat label="Clean" value={v.clean} tone="clean" />
          <Stat label="High flags" value={s.high} tone="serious" />
          <Stat label="Medium" value={s.medium} tone="issues" />
          <Stat label="Low" value={s.low} />
          <Stat label="Last scan" value={last ? last.slice(5, 10).replace("-", "/") : "—"} small />
        </div>
      </div>
      <ConversationTable rows={rows} />
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
  small,
}: {
  label: string;
  value: number | string;
  tone?: "serious" | "issues" | "clean";
  small?: boolean;
}) {
  return (
    <div className="bg-ink-2 px-4 py-3">
      <div className="eyebrow">{label}</div>
      <div className={`serif ${small ? "text-2xl" : "text-3xl"} mt-1 ${tone ? `verdict-${tone}` : "text-paper"}`}>{value}</div>
    </div>
  );
}
