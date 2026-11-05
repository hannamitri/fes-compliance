export type Source =
  | "fathom"
  | "close-call"
  | "close-sms"
  | "close-email"
  | "close-voicemail";

export type Severity = "high" | "medium" | "low";
export type Verdict = "clean" | "issues" | "serious";
export type Outcome = "enrolled" | "not-enrolled" | "unknown";

export interface Finding {
  /** Rule ids from rules.ts, e.g. ["C3", "P4"] */
  rules: string[];
  severity: Severity;
  /** seconds into the recording, or null for written channels */
  timestamp: number | null;
  /** deep link to the exact moment / message */
  link: string | null;
  quote: string;
  note: string;
}

export interface CompliantItem {
  area: string;
  note: string;
  timestamp: number | null;
  link: string | null;
}

export interface Review {
  id: string;
  source: Source;
  title: string;
  closer: { name: string; email: string };
  prospect: { name: string };
  /** ISO date-time */
  date: string;
  durationSec: number | null;
  url: string;
  closeUrl?: string;
  outcome: Outcome;
  verdict: Verdict;
  summary: string;
  /** what was actually reviewed, and any gaps (recording cut off, etc.) */
  coverage: string;
  findings: Finding[];
  compliant: CompliantItem[];
  reviewedAt: string;
  reviewer: string;
}
