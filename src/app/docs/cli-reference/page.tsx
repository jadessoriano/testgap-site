"use client";

import {
  Breadcrumb,
  AnchorHeading,
  InfoBox,
  PropTable,
} from "@/components/docs-layout";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/badge";
import { DocsPrevNext } from "@/components/docs-prev-next";
import { getPrevNext } from "@/lib/docs-meta";

const { prev, next } = getPrevNext("/docs/cli-reference");

export default function CLIReferencePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "CLI Reference" },
        ]}
      />
      <h1 className="text-2xl font-bold text-green glow-green mb-2">
        CLI Reference
      </h1>
      <p className="text-terminal-dim mb-8">
        All commands, flags, and exit codes for the testgap CLI.
      </p>

      <AnchorHeading id="analyze">testgap analyze</AnchorHeading>
      <p>
        The primary command. Scans your codebase, detects untested functions,
        and optionally runs AI analysis.
      </p>

      <CodeBlock
        code={`testgap analyze [PATH] [OPTIONS]`}
        filename="usage"
      />

      <h3>Arguments</h3>
      <PropTable
        rows={[
          {
            name: "PATH",
            type: "path",
            default: ".",
            description: "Project directory to analyze",
          },
        ]}
      />

      <h3>Options</h3>
      <PropTable
        rows={[
          {
            name: "--no-ai",
            type: "flag",
            description:
              "Skip AI analysis. No API key needed. Fast static analysis only.",
          },
          {
            name: "--format",
            type: "string",
            default: "human",
            description: "Output format: human, json, or markdown",
          },
          {
            name: "--fail-on-critical",
            type: "flag",
            description:
              "Exit with code 1 if any critical gaps are found. For CI gates.",
          },
          {
            name: "--languages",
            type: "string",
            description:
              "Comma-separated list of languages to analyze (e.g. rust,typescript)",
          },
          {
            name: "--min-severity",
            type: "string",
            default: "info",
            description:
              "Minimum severity to report: critical, warning, or info",
          },
          {
            name: "--ai-severity",
            type: "string",
            default: "critical",
            description:
              "Only send gaps at this severity or above to AI. Controls API cost.",
          },
          {
            name: "--verbose",
            type: "flag",
            description: "Enable verbose logging output",
          },
        ]}
      />

      <h3>Examples</h3>
      <CodeBlock
        code={`# Basic analysis (no AI)
testgap analyze --no-ai

# Analyze specific directory
testgap analyze ./my-project

# JSON output for CI
testgap analyze --format json --fail-on-critical --no-ai

# Only Rust and TypeScript
testgap analyze --languages rust,typescript

# Only show critical gaps
testgap analyze --min-severity critical

# AI on critical gaps only (saves cost)
testgap analyze --ai-severity critical

# Pipe to jq for custom filtering
testgap analyze --format json | jq '.gaps[] | select(.severity == "critical")'`}
        filename="examples.sh"
      />

      <AnchorHeading id="init">testgap init</AnchorHeading>
      <p>
        Creates a <code>.testgap.toml</code> configuration file in the current
        directory with sensible defaults.
      </p>

      <CodeBlock code={`testgap init`} filename="usage" />

      <InfoBox type="info" title="Non-destructive">
        If a <code>.testgap.toml</code> already exists, <code>init</code> will
        not overwrite it.
      </InfoBox>

      <AnchorHeading id="exit-codes">Exit Codes</AnchorHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-terminal-border">
              <th className="text-left py-2 pr-4 text-green font-bold">Code</th>
              <th className="text-left py-2 pr-4 text-green font-bold">Meaning</th>
              <th className="text-left py-2 text-green font-bold">When</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-terminal-border/50">
              <td className="py-2 pr-4 text-green font-bold font-mono">0</td>
              <td className="py-2 pr-4 text-terminal-text">Success</td>
              <td className="py-2 text-terminal-dim">
                No critical gaps found (or --fail-on-critical not set)
              </td>
            </tr>
            <tr className="border-b border-terminal-border/50">
              <td className="py-2 pr-4 text-red font-bold font-mono">1</td>
              <td className="py-2 pr-4 text-terminal-text">Critical gaps</td>
              <td className="py-2 text-terminal-dim">
                Critical gaps found and --fail-on-critical was set
              </td>
            </tr>
            <tr className="border-b border-terminal-border/50">
              <td className="py-2 pr-4 text-amber font-bold font-mono">2</td>
              <td className="py-2 pr-4 text-terminal-text">Runtime error</td>
              <td className="py-2 text-terminal-dim">
                Unexpected error (parse failure, I/O error, etc.)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AnchorHeading id="environment">Environment Variables</AnchorHeading>
      <PropTable
        rows={[
          {
            name: "ANTHROPIC_API_KEY",
            type: "string",
            description:
              "Required for AI analysis. Use --no-ai to skip. Get yours at console.anthropic.com.",
          },
        ]}
      />

      <DocsPrevNext prev={prev} next={next} />
    </>
  );
}
