"use client";

import {
  Breadcrumb,
  AnchorHeading,
  InfoBox,
} from "@/components/docs-layout";
import { CodeBlock } from "@/components/code-block";
import { DocsPrevNext } from "@/components/docs-prev-next";
import { getPrevNext } from "@/lib/docs-meta";

const { prev, next } = getPrevNext("/docs/ci-integration");

export default function CIIntegrationPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "CI Integration" },
        ]}
      />
      <h1 className="text-2xl font-bold text-green glow-green mb-2">
        CI Integration
      </h1>
      <p className="text-terminal-dim mb-8">
        Run testgap in your CI pipeline to catch test regressions before they
        ship.
      </p>

      <AnchorHeading id="github-actions">GitHub Actions</AnchorHeading>
      <p>
        Add testgap as a step in your GitHub Actions workflow:
      </p>

      <CodeBlock
        code={`name: Test Gap Analysis

on:
  pull_request:
    branches: [main]

jobs:
  testgap:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable

      - name: Install testgap
        run: cargo install testgap

      - name: Check test gaps
        run: testgap analyze --format json --fail-on-critical --no-ai`}
        filename=".github/workflows/testgap.yml"
        language="yaml"
      />

      <InfoBox type="info" title="No API key needed">
        With <code>--no-ai</code>, testgap uses pure static analysis. No API
        keys or external services needed in CI.
      </InfoBox>

      <AnchorHeading id="with-ai">With AI Analysis in CI</AnchorHeading>
      <p>
        If you want AI risk assessment in CI, add your Anthropic API key as a
        secret:
      </p>

      <CodeBlock
        code={`      - name: Check test gaps (with AI)
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: testgap analyze --format json --fail-on-critical --ai-severity critical`}
        filename=".github/workflows/testgap.yml"
        language="yaml"
      />

      <InfoBox type="warning" title="Cost control">
        Use <code>--ai-severity critical</code> to only send critical gaps to
        the AI. This dramatically reduces API costs in CI where you may run on
        every PR.
      </InfoBox>

      <AnchorHeading id="sarif">SARIF Output</AnchorHeading>
      <p>
        JSON output from testgap can be transformed to SARIF format for
        integration with GitHub Code Scanning and other security tools:
      </p>

      <CodeBlock
        code={`# Generate JSON output
testgap analyze --format json --no-ai > testgap-results.json

# Transform to SARIF (using jq)
cat testgap-results.json | jq '{
  "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/main/sarif-2.1/schema/sarif-schema-2.1.0.json",
  "version": "2.1.0",
  "runs": [{
    "tool": {
      "driver": {
        "name": "testgap",
        "version": "0.2.0"
      }
    },
    "results": [.gaps[] | {
      "ruleId": "testgap/\\(.severity)",
      "level": (if .severity == "critical" then "error" elif .severity == "warning" then "warning" else "note" end),
      "message": { "text": .reason },
      "locations": [{
        "physicalLocation": {
          "artifactLocation": { "uri": .file },
          "region": { "startLine": .line }
        }
      }]
    }]
  }]
}' > testgap.sarif`}
        filename="sarif-transform.sh"
      />

      <AnchorHeading id="fail-on-critical">CI Gate with --fail-on-critical</AnchorHeading>
      <p>
        The <code>--fail-on-critical</code> flag makes testgap exit with code
        1 when critical gaps are found. This is designed for use as a CI quality
        gate:
      </p>

      <CodeBlock
        code={`# Fails CI if any public+complex function is untested
testgap analyze --fail-on-critical --no-ai

# Check exit code
echo $?  # 0 = pass, 1 = critical gaps, 2 = error`}
        filename="terminal"
      />

      <h3>Exit Code Reference</h3>
      <ul>
        <li><code>0</code> — No critical gaps (CI passes)</li>
        <li><code>1</code> — Critical gaps found (CI fails)</li>
        <li><code>2</code> — Runtime error</li>
      </ul>

      <AnchorHeading id="other-ci">Other CI Systems</AnchorHeading>
      <p>
        testgap works with any CI system. The key flags for CI are:
      </p>
      <ul>
        <li><code>--format json</code> — machine-readable output</li>
        <li><code>--fail-on-critical</code> — non-zero exit on critical gaps</li>
        <li><code>--no-ai</code> — no external API calls needed</li>
      </ul>

      <CodeBlock
        code={`# GitLab CI
test-gaps:
  stage: test
  script:
    - cargo install testgap
    - testgap analyze --format json --fail-on-critical --no-ai

# CircleCI
- run:
    name: Check test gaps
    command: |
      cargo install testgap
      testgap analyze --format json --fail-on-critical --no-ai`}
        filename="other-ci.yml"
        language="yaml"
      />

      <DocsPrevNext prev={prev} next={next} />
    </>
  );
}
