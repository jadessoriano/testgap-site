"use client";

import {
  Breadcrumb,
  AnchorHeading,
  InfoBox,
  PropTable,
} from "@/components/docs-layout";
import { CodeBlock } from "@/components/code-block";
import { DocsPrevNext } from "@/components/docs-prev-next";
import { getPrevNext } from "@/lib/docs-meta";

const { prev, next } = getPrevNext("/docs/configuration");

export default function ConfigurationPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Configuration" },
        ]}
      />
      <h1 className="text-2xl font-bold text-green glow-green mb-2">
        Configuration
      </h1>
      <p className="text-terminal-dim mb-8">
        Configure testgap with a <code>.testgap.toml</code> file in your
        project root.
      </p>

      <AnchorHeading id="creating-config">Creating a Config File</AnchorHeading>
      <p>
        Run <code>testgap init</code> to generate a default config file:
      </p>
      <CodeBlock code={`testgap init`} filename="terminal" />

      <AnchorHeading id="full-example">Full Example</AnchorHeading>
      <CodeBlock
        code={`# .testgap.toml

[scan]
include = ["src/**", "lib/**"]
exclude = ["**/generated/**", "**/vendor/**", "**/*.test.*"]
languages = ["rust", "typescript", "python"]

[analysis]
min_severity = "warning"       # Only report warning+ gaps
complexity_threshold = 5       # Cyclomatic complexity threshold for "complex"

[ai]
enabled = true
ai_min_severity = "critical"   # Only send critical gaps to AI
model = "claude-sonnet-4-20250514"

[output]
format = "human"               # human | json | markdown
color = true`}
        filename=".testgap.toml"
        language="toml"
      />

      <AnchorHeading id="scan-section">[scan]</AnchorHeading>
      <p>Controls which files are scanned.</p>
      <PropTable
        rows={[
          {
            name: "include",
            type: "string[]",
            default: '["**"]',
            description: "Glob patterns for files to include",
          },
          {
            name: "exclude",
            type: "string[]",
            default: "[]",
            description:
              "Glob patterns for files to exclude (e.g. generated code, vendored deps)",
          },
          {
            name: "languages",
            type: "string[]",
            default: "all supported",
            description:
              "Filter to specific languages: rust, typescript, javascript, python, go",
          },
        ]}
      />

      <InfoBox type="info" title=".gitignore support">
        testgap automatically respects your <code>.gitignore</code> rules.
        Files ignored by git are never scanned. The <code>exclude</code> option
        is for additional exclusions beyond .gitignore.
      </InfoBox>

      <AnchorHeading id="analysis-section">[analysis]</AnchorHeading>
      <p>Controls gap detection and severity classification.</p>
      <PropTable
        rows={[
          {
            name: "min_severity",
            type: "string",
            default: '"info"',
            description:
              "Minimum severity to report: critical, warning, or info",
          },
          {
            name: "complexity_threshold",
            type: "number",
            default: "5",
            description:
              "Cyclomatic complexity threshold above which a function is considered 'complex' (affects critical classification)",
          },
        ]}
      />

      <AnchorHeading id="ai-section">[ai]</AnchorHeading>
      <p>Controls AI-powered analysis via Claude API.</p>
      <PropTable
        rows={[
          {
            name: "enabled",
            type: "boolean",
            default: "true",
            description:
              "Enable AI analysis. Set false to always run in --no-ai mode",
          },
          {
            name: "ai_min_severity",
            type: "string",
            default: '"critical"',
            description:
              "Only send gaps at this severity or above to the AI. Reduces API costs dramatically.",
          },
          {
            name: "model",
            type: "string",
            default: '"claude-sonnet-4-20250514"',
            description: "Claude model to use for analysis",
          },
        ]}
      />

      <InfoBox type="warning" title="API Key">
        AI analysis requires the <code>ANTHROPIC_API_KEY</code> environment
        variable. If not set, testgap falls back to static analysis only (same
        as <code>--no-ai</code>).
      </InfoBox>

      <AnchorHeading id="output-section">[output]</AnchorHeading>
      <p>Controls output format and display.</p>
      <PropTable
        rows={[
          {
            name: "format",
            type: "string",
            default: '"human"',
            description: "Output format: human, json, or markdown",
          },
          {
            name: "color",
            type: "boolean",
            default: "true",
            description: "Enable colored output (auto-disabled when piping)",
          },
        ]}
      />

      <AnchorHeading id="precedence">CLI vs Config Precedence</AnchorHeading>
      <p>
        CLI flags always override config file values. For example,{" "}
        <code>--format json</code> overrides <code>format = &quot;human&quot;</code> in the
        config file. This lets you set team defaults in{" "}
        <code>.testgap.toml</code> while allowing individual overrides.
      </p>

      <DocsPrevNext prev={prev} next={next} />
    </>
  );
}
