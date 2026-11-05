import type { Severity, Source, Verdict } from "@/lib/types";
import { SOURCE_LABEL } from "@/lib/format";
import { RULE_BY_ID } from "@/lib/rules";

export function VerdictBadge({ verdict, size = "sm" }: { verdict: Verdict; size?: "sm" | "lg" }) {
  const label = verdict === "serious" ? "Serious" : verdict === "issues" ? "Issues" : "Clean";
  return (
    <span className={`inline-flex items-center gap-2 verdict-${verdict} ${size === "lg" ? "text-base" : "text-sm"}`}>
      <span className={`dot dot-${verdict}`} />
      {label}
    </span>
  );
}

export function SeverityPill({ severity }: { severity: Severity }) {
  return (
    <span className={`sev-${severity} inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-wider`}>
      {severity}
    </span>
  );
}

export function SourcePill({ source }: { source: Source }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line-2 bg-ink-3 px-2 py-0.5 text-[11px] text-paper-2">
      {SOURCE_LABEL[source]}
    </span>
  );
}

export function RuleChip({ id }: { id: string }) {
  const r = RULE_BY_ID[id];
  return (
    <a
      href={`/rules#${id}`}
      title={r ? r.name : id}
      className="inline-flex items-center gap-1 rounded border border-line-2 bg-ink-2 px-1.5 py-0.5 text-[11px] text-paper-2 hover:border-gold hover:text-paper"
    >
      <span className="text-gold">{id}</span>
      {r && <span className="hidden sm:inline">{r.name}</span>}
    </a>
  );
}
