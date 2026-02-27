"use client";

import {
  Breadcrumb,
  AnchorHeading,
  InfoBox,
} from "@/components/docs-layout";
import { DocsPrevNext } from "@/components/docs-prev-next";
import { getPrevNext } from "@/lib/docs-meta";

const { prev, next } = getPrevNext("/docs/languages");

const languages = [
  {
    name: "Rust",
    extensions: [".rs"],
    testPatterns: [
      "#[test] attribute on functions",
      "#[cfg(test)] module attribute",
      "test_ prefix on function names",
    ],
    visibilityDetection:
      "pub keyword on fn declarations. Supports pub(crate), pub(super) variants.",
    example: `#[test]
fn test_process_payment() {
    let order = Order::new();
    let result = process_payment(&order, PaymentMethod::Card);
    assert!(result.is_ok());
}`,
  },
  {
    name: "TypeScript",
    extensions: [".ts", ".tsx", ".mts", ".cts"],
    testPatterns: [
      "test() and it() function calls",
      "describe() blocks",
      "Files in __tests__/ directories",
      "Files matching *.test.ts, *.spec.ts",
    ],
    visibilityDetection:
      "export keyword on function/const declarations. Default exports detected.",
    example: `describe('processPayment', () => {
  it('should process valid payment', () => {
    const result = processPayment(order, 'card');
    expect(result.success).toBe(true);
  });
});`,
  },
  {
    name: "JavaScript",
    extensions: [".js", ".jsx", ".mjs", ".cjs"],
    testPatterns: [
      "test() and it() function calls",
      "describe() blocks",
      "Files in __tests__/ directories",
      "Files matching *.test.js, *.spec.js",
    ],
    visibilityDetection:
      "export/module.exports detection. Named and default exports.",
    example: `test('processPayment handles card', () => {
  const result = processPayment(order, 'card');
  expect(result.success).toBe(true);
});`,
  },
  {
    name: "Python",
    extensions: [".py"],
    testPatterns: [
      "test_ prefix on function names",
      "Files in test/ or tests/ directories",
      "Files matching test_*.py, *_test.py",
    ],
    visibilityDetection:
      "Functions without leading underscore are considered public. _private and __dunder detected.",
    example: `def test_process_payment():
    order = Order()
    result = process_payment(order, "card")
    assert result.success`,
  },
  {
    name: "Go",
    extensions: [".go"],
    testPatterns: [
      "Test prefix on function names (TestXxx)",
      "*testing.T parameter",
      "Files matching *_test.go",
    ],
    visibilityDetection:
      "Uppercase first letter = exported (public). Lowercase = unexported (private).",
    example: `func TestProcessPayment(t *testing.T) {
    order := NewOrder()
    result, err := ProcessPayment(order, "card")
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
}`,
  },
];

export default function LanguagesPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Supported Languages" },
        ]}
      />
      <h1 className="text-2xl font-bold text-green glow-green mb-2">
        Supported Languages
      </h1>
      <p className="text-terminal-dim mb-8">
        testgap uses tree-sitter grammars to parse source code. Each language
        has specific patterns for detecting test functions and visibility.
      </p>

      {/* Summary table */}
      <AnchorHeading id="overview">Overview</AnchorHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-terminal-border">
              <th className="text-left py-2 pr-4 text-green font-bold">Language</th>
              <th className="text-left py-2 pr-4 text-green font-bold">Extensions</th>
              <th className="text-left py-2 text-green font-bold">Test Detection</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang) => (
              <tr
                key={lang.name}
                className="border-b border-terminal-border/50"
              >
                <td className="py-2 pr-4 text-terminal-text font-bold">
                  {lang.name}
                </td>
                <td className="py-2 pr-4 text-amber font-mono text-xs">
                  {lang.extensions.join(", ")}
                </td>
                <td className="py-2 text-terminal-dim text-xs">
                  {lang.testPatterns[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Per-language details */}
      {languages.map((lang) => (
        <div key={lang.name}>
          <AnchorHeading id={lang.name.toLowerCase()}>{lang.name}</AnchorHeading>

          <h3>Extensions</h3>
          <p>
            {lang.extensions.map((ext, i) => (
              <code key={ext}>
                {ext}
                {i < lang.extensions.length - 1 ? ", " : ""}
              </code>
            ))}
          </p>

          <h3>Test Detection</h3>
          <ul>
            {lang.testPatterns.map((pattern) => (
              <li key={pattern}>{pattern}</li>
            ))}
          </ul>

          <h3>Visibility</h3>
          <p>{lang.visibilityDetection}</p>

          <h3>Example Test</h3>
          <div className="terminal-chrome my-4">
            <div className="terminal-title-bar">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-2 text-xs text-terminal-dim">
                example test
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="text-terminal-text">{lang.example}</code>
            </pre>
          </div>
        </div>
      ))}

      <InfoBox type="info" title="Adding a language">
        Want support for another language? See the{" "}
        <a
          href="https://github.com/jadessoriano/testgap/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contributing Guide
        </a>{" "}
        for instructions on adding a new tree-sitter grammar.
      </InfoBox>

      <DocsPrevNext prev={prev} next={next} />
    </>
  );
}
