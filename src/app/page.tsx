"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  TreePine,
  Shield,
  Zap,
  Terminal,
  GitBranch,
  FileCode,
  ArrowRight,
  ChevronRight,
  Cpu,
  Eye,
  Layers,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SearchModal } from "@/components/search-modal";
import { TerminalWindow, TerminalTyping } from "@/components/terminal-window";
import { Badge } from "@/components/badge";
import { CodeBlock } from "@/components/code-block";

const ASCII_LOGO = `
 ▄▄▄█████▓▓█████   ██████ ▄▄▄█████▓  ▄████  ▄▄▄       ██▓███
 ▓  ██▒ ▓▒▓█   ▀ ▒██    ▒ ▓  ██▒ ▓▒ ██▒ ▀█▒▒████▄    ▓██░  ██▒
 ▒ ▓██░ ▒░▒███   ░ ▓██▄   ▒ ▓██░ ▒░▒██░▄▄▄░▒██  ▀█▄  ▓██░ ██▓▒
 ░ ▓██▓ ░ ▒▓█  ▄   ▒   ██▒░ ▓██▓ ░ ░▓█  ██▓░██▄▄▄▄██ ▒██▄█▓▒ ▒
   ▒██▒ ░ ░▒████▒▒██████▒▒  ▒██▒ ░ ░▒▓███▀▒ ▓█   ▓██▒▒██▒ ░  ░
   ▒ ░░   ░░ ▒░ ░▒ ▒▓▒ ▒ ░  ▒ ░░    ░▒   ▒  ▒▒   ▓▒█░▒▓▒░ ░  ░
     ░     ░ ░  ░░ ░▒  ░ ░    ░      ░   ░   ▒   ▒▒ ░░▒ ░
   ░         ░   ░  ░  ░    ░      ░ ░   ░   ░   ▒   ░░
             ░  ░      ░                 ░       ░  ░
`.trim();

const demoLines = [
  { text: "$ testgap analyze --no-ai", className: "text-green" },
  { text: "", className: "" },
  { text: "  testgap — Test Gap Analysis", className: "text-green glow-green" },
  {
    text: "  ────────────────────────────────────────",
    className: "text-terminal-border-light",
  },
  { text: "  Project:   /home/user/my-project", className: "text-terminal-dim" },
  {
    text: "  Languages: rust, typescript",
    className: "text-terminal-dim",
  },
  { text: "  Coverage:  42/68 functions (61.8%)", className: "text-terminal-dim" },
  { text: "  AI:        disabled", className: "text-terminal-dim" },
  { text: "", className: "" },
  { text: "  CRITICAL (3) ─────────────────────────", className: "text-red" },
  {
    text: "    process_payment src/billing.rs:47",
    className: "text-red-light",
  },
  {
    text: "      Public function with high complexity (12) and no test coverage",
    className: "text-terminal-dim",
  },
  { text: "", className: "" },
  {
    text: "    validate_schema src/api/handlers.rs:112",
    className: "text-red-light",
  },
  {
    text: "      Public function with high complexity (8) and no test coverage",
    className: "text-terminal-dim",
  },
  { text: "", className: "" },
  { text: "  WARNING (5) ──────────────────────────", className: "text-amber" },
  {
    text: "    parse_config src/config.rs:23",
    className: "text-amber-light",
  },
  {
    text: "      Public function with no test coverage",
    className: "text-terminal-dim",
  },
  { text: "", className: "" },
  {
    text: "  Summary: 3 critical, 5 warning, 18 info",
    className: "text-terminal-text",
  },
];

const features = [
  {
    icon: TreePine,
    title: "Tree-sitter Parsing",
    description:
      "Extracts every function from your codebase using tree-sitter grammars. No runtime needed — works on raw source files.",
  },
  {
    icon: Shield,
    title: "Severity Classification",
    description:
      "Critical: public + complex + untested. Warning: public + untested. Info: private + untested. Prioritize what matters.",
  },
  {
    icon: Cpu,
    title: "AI Risk Assessment",
    description:
      "Optionally send gaps to Claude AI for risk analysis and test suggestions. Use --ai-severity to control API costs.",
  },
  {
    icon: Zap,
    title: "Parallel Parsing",
    description:
      "Uses rayon for multi-core file parsing. Respects .gitignore rules automatically. Fast even on large codebases.",
  },
  {
    icon: GitBranch,
    title: "CI Integration",
    description:
      "JSON output, SARIF format, --fail-on-critical exit codes. Drop into any CI pipeline as a quality gate.",
  },
  {
    icon: Layers,
    title: "5 Languages",
    description:
      "Rust, TypeScript, JavaScript, Python, Go. Detects test functions by language-specific patterns and conventions.",
  },
];

const pipelineSteps = [
  {
    step: "01",
    label: "Scan",
    description: "Walk the project and classify source vs test files",
    icon: Search,
  },
  {
    step: "02",
    label: "Extract",
    description: "Parse functions from source files using tree-sitter",
    icon: FileCode,
  },
  {
    step: "03",
    label: "Map",
    description: "Match tests to functions by name, file convention, and body",
    icon: Eye,
  },
  {
    step: "04",
    label: "Detect",
    description: "Identify untested functions and classify severity",
    icon: Shield,
  },
  {
    step: "05",
    label: "Analyze",
    description: "Optional: send gaps to Claude AI for risk assessment",
    icon: Cpu,
  },
];

const languages = [
  { name: "Rust", ext: ".rs", tests: "#[test], #[cfg(test)]" },
  { name: "TypeScript", ext: ".ts, .tsx", tests: "test(), it(), describe()" },
  { name: "JavaScript", ext: ".js, .jsx", tests: "test(), it(), describe()" },
  { name: "Python", ext: ".py", tests: "test_ prefix, test dirs" },
  { name: "Go", ext: ".go", tests: "Test prefix, *testing.T" },
];

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="pt-14">
        {/* ── Hero ────────────────────────────────────────── */}
        <section className="relative overflow-hidden scanlines">
          <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
            {/* ASCII art */}
            <pre
              className="text-green text-[8px] sm:text-[10px] md:text-xs leading-tight glow-green text-center select-none mb-8"
              aria-hidden="true"
            >
              {ASCII_LOGO}
            </pre>

            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-terminal-text mb-4">
              AI-Powered{" "}
              <span className="text-green glow-green">Test Gap</span> Finder
            </h1>
            <p className="text-center text-terminal-dim max-w-2xl mx-auto mb-8 text-sm sm:text-base">
              Scans your codebase with tree-sitter, identifies untested
              functions, and uses Claude to suggest what tests to write.
            </p>

            {/* Quick install */}
            <div className="max-w-md mx-auto mb-12">
              <TerminalWindow title="install">
                <div className="flex items-center gap-2">
                  <span className="text-green select-none">$</span>
                  <span className="text-terminal-text">
                    cargo install testgap
                  </span>
                  <span className="cursor-blink" />
                </div>
              </TerminalWindow>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link
                href="/docs"
                className="flex items-center gap-2 px-5 py-2.5 bg-green/10 border border-green/30 rounded text-green text-sm hover:bg-green/20 transition-colors glow-box-green"
              >
                <Terminal className="w-4 h-4" />
                Get Started
              </Link>
              <a
                href="https://github.com/jadessoriano/testgap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-terminal-border rounded text-terminal-dim text-sm hover:text-terminal-text hover:border-terminal-border-light transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                View Source
              </a>
            </div>
          </div>
        </section>

        {/* ── Animated Demo ──────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <TerminalTyping
            lines={demoLines}
            speed={15}
            lineDelay={100}
            title="testgap — demo"
          />
        </section>

        {/* ── Features Grid ──────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <h2 className="text-center text-lg font-bold text-terminal-text mb-2">
            <span className="text-green">$</span> cat features.md
          </h2>
          <p className="text-center text-terminal-dim text-sm mb-10">
            Static analysis, AI insights, CI-ready output
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="border border-terminal-border rounded-lg p-5 hover:border-green/30 transition-colors group"
              >
                <f.icon className="w-5 h-5 text-green mb-3 group-hover:glow-green transition-all" />
                <h3 className="text-sm font-bold text-terminal-text mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-terminal-dim leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Severity Classification ────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <h2 className="text-center text-lg font-bold text-terminal-text mb-8">
            <span className="text-green">$</span> testgap --explain-severity
          </h2>
          <div className="space-y-4">
            {[
              {
                severity: "critical" as const,
                rule: "public + complex + untested",
                example:
                  "pub fn process_payment(order: &Order) → Result<Receipt>",
                why: "High complexity public APIs are most likely to contain bugs and most impactful when they fail.",
              },
              {
                severity: "warning" as const,
                rule: "public + untested",
                example: "pub fn parse_config(path: &str) → Config",
                why: "Public functions are part of your API contract. Regressions here break consumers.",
              },
              {
                severity: "info" as const,
                rule: "private + untested",
                example: "fn normalize_key(key: &str) → String",
                why: "Private helpers are lower risk — they're only called by tested public functions.",
              },
            ].map((item) => (
              <div
                key={item.severity}
                className="border border-terminal-border rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Badge severity={item.severity} />
                  <span className="text-xs text-terminal-dim">{item.rule}</span>
                </div>
                <code className="block text-xs text-amber mb-2">
                  {item.example}
                </code>
                <p className="text-xs text-terminal-dim">{item.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works Pipeline ──────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <h2 className="text-center text-lg font-bold text-terminal-text mb-8">
            <span className="text-green">$</span> testgap --explain-pipeline
          </h2>
          <div className="space-y-0">
            {pipelineSteps.map((step, i) => (
              <div key={step.step} className="flex items-stretch gap-4">
                {/* Vertical line */}
                <div className="flex flex-col items-center w-8 shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${
                      i === pipelineSteps.length - 1
                        ? "border-green text-green"
                        : "border-terminal-border-light text-terminal-dim"
                    }`}
                  >
                    {step.step}
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <div className="w-px flex-1 bg-terminal-border" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="w-4 h-4 text-green" />
                    <h3 className="text-sm font-bold text-terminal-text">
                      {step.label}
                    </h3>
                  </div>
                  <p className="text-xs text-terminal-dim">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Languages ──────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <h2 className="text-center text-lg font-bold text-terminal-text mb-8">
            <span className="text-green">$</span> testgap --list-languages
          </h2>
          <div className="terminal-chrome">
            <div className="terminal-title-bar">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-2 text-xs text-terminal-dim">
                supported languages
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-terminal-border">
                    <th className="text-left px-4 py-2 text-green font-bold">
                      Language
                    </th>
                    <th className="text-left px-4 py-2 text-green font-bold">
                      Extensions
                    </th>
                    <th className="text-left px-4 py-2 text-green font-bold">
                      Test Detection
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {languages.map((lang) => (
                    <tr
                      key={lang.name}
                      className="border-b border-terminal-border/50"
                    >
                      <td className="px-4 py-2 text-terminal-text">
                        {lang.name}
                      </td>
                      <td className="px-4 py-2 text-amber font-mono text-xs">
                        {lang.ext}
                      </td>
                      <td className="px-4 py-2 text-terminal-dim text-xs">
                        {lang.tests}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Quick Start ────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <h2 className="text-center text-lg font-bold text-terminal-text mb-8">
            <span className="text-green">$</span> cat quickstart.sh
          </h2>
          <CodeBlock
            code={`# Install
cargo install testgap

# Run analysis (no AI, no API key needed)
testgap analyze --no-ai

# Run with AI suggestions (needs ANTHROPIC_API_KEY)
export ANTHROPIC_API_KEY="sk-ant-..."
testgap analyze

# Create a config file
testgap init

# CI mode — fail on critical gaps
testgap analyze --format json --fail-on-critical --no-ai`}
            filename="quickstart.sh"
          />
          <div className="text-center mt-6">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-sm text-green hover:glow-green transition-all"
            >
              Read the full docs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────── */}
        <footer className="border-t border-terminal-border py-10">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green font-bold glow-green">testgap</span>
              <span className="text-terminal-dim">v0.2.0</span>
              <span className="text-terminal-dim">·</span>
              <span className="text-terminal-dim">MIT License</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-terminal-dim">
              <Link href="/docs" className="hover:text-green transition-colors">
                Docs
              </Link>
              <a
                href="https://github.com/jadessoriano/testgap"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://crates.io/crates/testgap"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green transition-colors"
              >
                crates.io
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
