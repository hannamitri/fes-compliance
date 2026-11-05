import type { Metadata } from "next";
import { Instrument_Serif, Karla } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FES Compliance Monitor",
  description: "Sales-call compliance reviews for Front End Simplified",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${karla.variable} h-full antialiased`}>
      <body className="relative z-10 min-h-full flex flex-col">
        <header className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-baseline gap-3">
              <span className="serif italic text-2xl text-paper">FES</span>
              <span className="eyebrow">Compliance Monitor</span>
            </Link>
            <nav className="flex items-center gap-7 text-sm text-paper-2">
              <Link href="/" className="hover:text-paper">Conversations</Link>
              <Link href="/closers" className="hover:text-paper">Closers</Link>
              <Link href="/rules" className="hover:text-paper">Rules</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl px-6 py-10 flex-1">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-paper-4 flex flex-wrap gap-x-6 gap-y-2">
            <span>Internal. Reviews are AI-generated from recordings and transcripts; verify against audio before acting.</span>
            <span>Rule set: internal closer checklist + FES FTC Compliance Audit (Nov 5, 2026).</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
