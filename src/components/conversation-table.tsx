"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Review, Source, Verdict } from "@/lib/types";
import { fmtDate, fmtDuration, SOURCE_LABEL } from "@/lib/format";
import { SourcePill, VerdictBadge } from "./badges";

type Row = Pick<
  Review,
  "id" | "source" | "title" | "closer" | "prospect" | "date" | "durationSec" | "verdict" | "outcome" | "summary"
> & { high: number; medium: number; low: number };

export function ConversationTable({ rows }: { rows: Row[] }) {
  const [closer, setCloser] = useState("all");
  const [source, setSource] = useState<"all" | Source>("all");
  const [verdict, setVerdict] = useState<"all" | Verdict>("all");
  const [q, setQ] = useState("");

  const closers = useMemo(
    () => [...new Set(rows.map((r) => r.closer.name))].sort(),
    [rows],
  );
  const sources = useMemo(
    () => [...new Set(rows.map((r) => r.source))] as Source[],
    [rows],
  );

  const filtered = rows.filter((r) => {
    if (closer !== "all" && r.closer.name !== closer) return false;
    if (source !== "all" && r.source !== source) return false;
    if (verdict !== "all" && r.verdict !== verdict) return false;
    if (q) {
      const hay = `${r.title} ${r.prospect.name} ${r.closer.name} ${r.summary}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  const sel =
    "bg-ink-2 border border-line-2 rounded px-3 py-2 text-sm text-paper-2 focus:outline-none focus:border-gold";

  return (
    <div className="rise" style={{ animationDelay: "120ms" }}>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search prospect, closer, summary"
          className={`${sel} w-64`}
        />
        <select value={closer} onChange={(e) => setCloser(e.target.value)} className={sel}>
          <option value="all">All closers</option>
          {closers.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={source} onChange={(e) => setSource(e.target.value as Source | "all")} className={sel}>
          <option value="all">All sources</option>
          {sources.map((s) => (
            <option key={s} value={s}>{SOURCE_LABEL[s]}</option>
          ))}
        </select>
        <select value={verdict} onChange={(e) => setVerdict(e.target.value as Verdict | "all")} className={sel}>
          <option value="all">All verdicts</option>
          <option value="serious">Serious</option>
          <option value="issues">Issues</option>
          <option value="clean">Clean</option>
        </select>
        <span className="ml-auto text-xs text-paper-3">{filtered.length} of {rows.length}</span>
      </div>

      <div className="border border-line rounded-lg overflow-hidden bg-ink-2/60">
        <div className="hidden md:grid grid-cols-[minmax(0,2.2fr)_1fr_1fr_0.9fr_0.9fr_1fr] gap-4 px-5 py-2.5 border-b border-line eyebrow">
          <span>Conversation</span>
          <span>Closer</span>
          <span>Source</span>
          <span>Date</span>
          <span>Verdict</span>
          <span className="text-right">Flags</span>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-paper-3">Nothing matches those filters.</div>
        )}
        {filtered.map((r) => (
          <Link
            key={r.id}
            href={`/calls/${r.id}`}
            className="row-hover grid grid-cols-1 md:grid-cols-[minmax(0,2.2fr)_1fr_1fr_0.9fr_0.9fr_1fr] gap-x-4 gap-y-1 px-5 py-4 border-b border-line last:border-b-0 items-center"
          >
            <div className="min-w-0">
              <div className="serif text-xl text-paper leading-tight truncate">{r.prospect.name}</div>
              <div className="text-xs text-paper-3 mt-0.5 truncate">
                {r.outcome === "enrolled" ? "Enrolled" : r.outcome === "not-enrolled" ? "Did not enroll" : "Outcome unknown"}
                {r.durationSec ? ` · ${fmtDuration(r.durationSec)}` : ""}
              </div>
            </div>
            <div className="text-sm text-paper-2">{r.closer.name}</div>
            <div><SourcePill source={r.source} /></div>
            <div className="text-sm text-paper-2">{fmtDate(r.date)}</div>
            <div><VerdictBadge verdict={r.verdict} /></div>
            <div className="flex md:justify-end gap-3 text-sm tabular-nums">
              <span className={r.high ? "text-high" : "text-paper-4"}>{r.high}</span>
              <span className={r.medium ? "text-medium" : "text-paper-4"}>{r.medium}</span>
              <span className={r.low ? "text-low" : "text-paper-4"}>{r.low}</span>
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-3 text-xs text-paper-4">
        Flags column: <span className="text-high">high</span> · <span className="text-medium">medium</span> · <span className="text-low">low</span>
      </p>
    </div>
  );
}
