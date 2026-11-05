/**
 * The rule set every conversation is scanned against.
 * C1–C7 are the internal FES closer checklist.
 * P2–P14 are sections of the FES FTC Compliance Audit (Nov 5, 2026).
 * Edit wording here; ids are referenced from data/reviews/*.json.
 */
export interface Rule {
  id: string;
  name: string;
  source: "internal" | "ftc-audit";
  risk: "Critical" | "High";
  items: string[];
}

export const RULES: Rule[] = [
  {
    id: "C1",
    name: "Refunds & Cancellations",
    source: "internal",
    risk: "Critical",
    items: [
      "Closer refuses or discourages cancellation within the 14-calendar-day window.",
      "Closer says students cannot cancel under any circumstances.",
      "Cancellation requests are not directed to info@frontendsimplified.com, a Mentor, or any team member.",
      "A refund or cancellation request gets no response.",
      "Closer says the student can cancel at any time. Cancellation is only within 14 days of joining, or when the Job Guarantee requirements (30 applications per week for 6 months) were met.",
    ],
  },
  {
    id: "C2",
    name: "Job & Salary Promises",
    source: "internal",
    risk: "Critical",
    items: [
      "Promises employment within a specific timeframe.",
      "Says students automatically qualify for a refund if unemployed after 365 days.",
    ],
  },
  {
    id: "C3",
    name: "Job Guarantee Misrepresentation",
    source: "internal",
    risk: "Critical",
    items: [
      "Does not explain the requirements when discussing the Job Guarantee.",
      "Claims students do not need to apply to 30 jobs weekly for 6 months.",
      "Claims students do not need to document their job search.",
    ],
  },
  {
    id: "C4",
    name: "Financing & Payments",
    source: "internal",
    risk: "Critical",
    items: [
      "Claims students only pay once employed.",
      "Claims loan repayments automatically stop if they do not progress.",
      "Misrepresents tuition costs, payment obligations, or loan terms.",
      "Claims students can stop paying if unhappy, without the 14-day limit.",
    ],
  },
  {
    id: "C5",
    name: "Program & Support Misrepresentation",
    source: "internal",
    risk: "High",
    items: [
      "Promises one mentor available 24/7 (support is a rotating team).",
      "Claims a one-on-one call every day or every week (students can book a call any time).",
    ],
  },
  {
    id: "C6",
    name: "Pressure & Misleading Sales Tactics",
    source: "internal",
    risk: "Critical",
    items: [
      "Tells the student to sign without reading.",
      "Claims contract terms do not matter or will not be enforced.",
      "Promises undocumented exceptions or benefits (laptop, scholarship).",
    ],
  },
  {
    id: "C7",
    name: "Communication & Complaints",
    source: "internal",
    risk: "High",
    items: [
      "Student says they were misled.",
      "Buyer's remorse or confusion.",
      "Closer ignores financial hardship or cancellation concerns.",
      "Closer promises a follow-up and never follows through.",
    ],
  },
  {
    id: "P2",
    name: "Income and salary claims",
    source: "ftc-audit",
    risk: "Critical",
    items: [
      "Do not state or imply a student will earn a particular salary unless substantiated and qualified.",
      "Do not present exceptional outcomes as typical.",
      "Separate entry-level salaries from senior salaries; no rapid-progression implication without evidence.",
      "Do not imply every graduate gets remote work, full-time employment, or a software role.",
      "Do not use general industry salary data as if it proves FES graduate outcomes.",
    ],
  },
  {
    id: "P3",
    name: "Employment rates and time-to-job claims",
    source: "ftc-audit",
    risk: "Critical",
    items: [
      "Do not promise employment within 3–6 weeks or any timeframe unless contractually committed.",
      "Do not imply career support equals job placement or that FES controls hiring.",
      "Distinguish training-related jobs from unrelated work, contract roles, and internships.",
    ],
  },
  {
    id: "P4",
    name: "Job and money-back guarantees",
    source: "ftc-audit",
    risk: "Critical",
    items: [
      "Describe the guarantee precisely; do not say 'guaranteed employment' for a conditional refund.",
      "Do not call the program risk-free or imply the loan disappears if no job is obtained.",
      "Disclose all eligibility requirements before enrollment: coursework, portfolio approval, application volume, documentation, deadlines.",
      "Explain how a refund interacts with financing, interest, fees, and lender balance.",
    ],
  },
  {
    id: "P5",
    name: "Loans, financing and future-income repayment",
    source: "ftc-audit",
    risk: "Critical",
    items: [
      "Do not describe a loan as a grant, scholarship, free tuition, or risk-free financing.",
      "Do not say 'you only pay if you get a job' unless the contract says so.",
      "Do not say the loan pays itself off, takes care of itself, or clears with the first paychecks.",
      "Do not guarantee a future salary, job, repayment ability, or payoff timeframe.",
      "Do not quote monthly payments without confirming lender terms and saying estimates may change.",
      "Do not coach the applicant on what to enter in a lender application (income, employment status).",
    ],
  },
  {
    id: "P6",
    name: "Testimonials and graduate stories",
    source: "ftc-audit",
    risk: "High",
    items: [
      "Use genuine, verified testimonials; do not imply an individual result is typical.",
      "Disclose material connections or incentives.",
    ],
  },
  {
    id: "P7",
    name: "Internships and work opportunities",
    source: "ftc-audit",
    risk: "High",
    items: [
      "Do not imply every student receives an internship if selection is competitive or capacity-limited.",
      "State positions, eligibility, selection, timing, and whether paid.",
      "Do not suggest an internship guarantees a permanent role or salary.",
    ],
  },
  {
    id: "P8",
    name: "Curriculum, mentors, services and credentials",
    source: "ftc-audit",
    risk: "High",
    items: [
      "Do not imply endorsement or partnership with Google, Meta, or others because a mentor worked there.",
      "Do not claim accreditation or industry recognition unless documented.",
      "Describe support hours, response times, and access exactly as delivered.",
      "Do not describe a self-paced program as fixed-duration if students can take materially longer.",
    ],
  },
  {
    id: "P9",
    name: "AI and labour-market claims",
    source: "ftc-audit",
    risk: "High",
    items: [
      "Avoid absolute claims such as 'AI cannot replace developers' or 'frontend is recession-proof'.",
      "Substantiate claims about job growth, hiring demand, and junior-role availability.",
    ],
  },
  {
    id: "P10",
    name: "Tuition, costs, refunds and cancellation",
    source: "ftc-audit",
    risk: "Critical",
    items: [
      "Disclose total tuition and all mandatory fees before enrollment.",
      "Explain deposits, cancellation windows, refund eligibility, and processing timelines.",
      "Do not advertise a monthly figure without the total commitment and financing conditions.",
      "Make the written refund and cancellation policy available before payment or signature.",
    ],
  },
  {
    id: "P11",
    name: "Admissions conduct and sales calls",
    source: "ftc-audit",
    risk: "Critical",
    items: [
      "No artificial scarcity, fabricated deadlines, or misleading limited-places or discount claims.",
      "Do not conceal material conditions, pressure a prospect to sign before reviewing agreements, or discourage independent advice.",
      "Do not exploit financial distress, unemployment, or urgency to change careers.",
      "Verbal explanations must not contradict the website, contract, guarantee, or lender agreement.",
    ],
  },
  {
    id: "P12",
    name: "Calls, texts, email and privacy",
    source: "ftc-audit",
    risk: "High",
    items: [
      "Call-recording consent; do not assume one-party consent applies everywhere.",
      "Secure handling of recordings and prospect data (SSN, DOB, card numbers should not be read aloud on recordings).",
    ],
  },
  {
    id: "P14",
    name: "Claims to remove immediately",
    source: "ftc-audit",
    risk: "Critical",
    items: [
      "\"You'll get a $70K–$90K job.\"",
      "\"You'll be working within 3–6 weeks.\"",
      "\"Pay the loan off with your first few paychecks.\"",
      "\"You can't lose money / can't get stuck with the loan.\"",
      "\"You only pay if you get a job.\"",
      "\"All graduates are making six figures.\"",
      "\"Guaranteed remote position.\"",
      "\"AI has created more developer jobs than ever.\"",
      "\"Everyone gets the internship.\"",
      "\"Industry-recognised certificate.\"",
    ],
  },
];

export const RULE_BY_ID: Record<string, Rule> = Object.fromEntries(
  RULES.map((r) => [r.id, r]),
);
