"use client";

import { Breadcrumb, InfoBox, AnchorHeading } from "@/components/docs-layout";
import { CodeBlock } from "@/components/code-block";
import { CommandLine } from "@/components/command-line";
import { DocsPrevNext } from "@/components/docs-prev-next";
import { getPrevNext } from "@/lib/docs-meta";

const { prev, next } = getPrevNext("/docs");

export default function GettingStarted() {
  return (
    <>
      <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Getting Started" }]} />
      <h1 className="text-2xl font-bold text-green glow-green mb-2">
        Getting Started
      </h1>
      <p className="text-terminal-dim mb-8">
        Install testgap and run your first test gap analysis in under a minute.
      </p>

      <AnchorHeading id="installation">Installation</AnchorHeading>

      <p>
        testgap is a Rust CLI tool. Install it with cargo:
      </p>

      <CodeBlock
        code={`# From crates.io
cargo install testgap

# Or from source
git clone https://github.com/jadessoriano/testgap.git
cd testgap
cargo install --path crates/testgap-cli`}
        filename="install.sh"
      />

      <InfoBox type="info" title="Prerequisites">
        You need Rust and Cargo installed. Get them from{" "}
        <a href="https://rustup.rs" target="_blank" rel="noopener noreferrer">
          rustup.rs
        </a>
        .
      </InfoBox>

      <AnchorHeading id="quick-start">Quick Start</AnchorHeading>

      <p>
        Run a static analysis on your project — no AI, no API key needed:
      </p>

      <CodeBlock
        code={`cd your-project
testgap analyze --no-ai`}
        filename="terminal"
      />

      <p>
        This scans your codebase using tree-sitter, extracts all functions,
        matches them to tests, and reports untested functions classified by
        severity.
      </p>

      <AnchorHeading id="ai-analysis">AI Analysis</AnchorHeading>

      <p>
        To get AI-powered risk assessment and test suggestions, set your
        Anthropic API key:
      </p>

      <CodeBlock
        code={`export ANTHROPIC_API_KEY="sk-ant-..."
testgap analyze`}
        filename="terminal"
      />

      <InfoBox type="warning" title="API Costs">
        AI analysis sends function signatures and gap details to Claude. Use{" "}
        <code>--ai-severity critical</code> to only analyze critical gaps and
        reduce API costs.
      </InfoBox>

      <AnchorHeading id="output-formats">Output Formats</AnchorHeading>

      <p>testgap supports three output formats:</p>

      <CodeBlock
        code={`# Human-readable (default)
testgap analyze

# JSON (for CI pipelines)
testgap analyze --format json

# Markdown (for reports)
testgap analyze --format markdown`}
        filename="terminal"
      />

      <AnchorHeading id="configuration">Configuration</AnchorHeading>

      <p>
        Create a <code>.testgap.toml</code> config file for your project:
      </p>

      <CodeBlock
        code={`testgap init`}
        filename="terminal"
      />

      <p>
        This generates a config file with sensible defaults. See the{" "}
        <a href="/docs/configuration">Configuration</a> page for all options.
      </p>

      <AnchorHeading id="best-practices">Best Practices</AnchorHeading>

      <h3>Best use cases</h3>
      <ul>
        <li>CI gate for untested public APIs</li>
        <li>Pre-release audit of test coverage</li>
        <li>Onboarding into an unfamiliar codebase</li>
        <li>Prioritizing which tests to write first</li>
      </ul>

      <h3>Tips</h3>
      <ul>
        <li>
          Start with <code>--no-ai</code> to get a fast baseline without API
          costs
        </li>
        <li>
          Use <code>--fail-on-critical</code> in CI to catch regressions
        </li>
        <li>
          Use <code>--ai-severity critical</code> to control AI spend
        </li>
        <li>
          Pipe JSON output to <code>jq</code> for custom filtering
        </li>
        <li>
          Add <code>.testgap.toml</code> early so the team shares settings
        </li>
      </ul>

      <InfoBox type="info" title="Not a replacement for runtime coverage">
        testgap uses static analysis — it doesn&apos;t run your code. Use it
        alongside tools like lcov, tarpaulin, or istanbul for complete coverage
        visibility.
      </InfoBox>

      <DocsPrevNext prev={prev} next={next} />
    </>
  );
}
