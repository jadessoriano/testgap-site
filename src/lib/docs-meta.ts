export interface DocPage {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
}

export const docPages: DocPage[] = [
  {
    slug: "/docs",
    title: "Getting Started",
    shortTitle: "Getting Started",
    description: "Install testgap and run your first analysis",
  },
  {
    slug: "/docs/configuration",
    title: "Configuration",
    shortTitle: "Configuration",
    description: "Configure testgap with .testgap.toml",
  },
  {
    slug: "/docs/cli-reference",
    title: "CLI Reference",
    shortTitle: "CLI Reference",
    description: "All commands, flags, and exit codes",
  },
  {
    slug: "/docs/ci-integration",
    title: "CI Integration",
    shortTitle: "CI Integration",
    description: "GitHub Actions, SARIF output, and CI gates",
  },
  {
    slug: "/docs/languages",
    title: "Supported Languages",
    shortTitle: "Languages",
    description: "Language-specific test detection and patterns",
  },
];

export function getPrevNext(currentSlug: string) {
  const idx = docPages.findIndex((p) => p.slug === currentSlug);
  return {
    prev: idx > 0 ? docPages[idx - 1] : null,
    next: idx < docPages.length - 1 ? docPages[idx + 1] : null,
  };
}

export interface SearchEntry {
  title: string;
  slug: string;
  keywords: string[];
}

export const searchIndex: SearchEntry[] = [
  {
    title: "Getting Started",
    slug: "/docs",
    keywords: [
      "install",
      "cargo",
      "quick start",
      "setup",
      "analyze",
      "demo",
    ],
  },
  {
    title: "Configuration",
    slug: "/docs/configuration",
    keywords: [
      "testgap.toml",
      "config",
      "exclude",
      "include",
      "severity",
      "ai",
      "toml",
    ],
  },
  {
    title: "CLI Reference",
    slug: "/docs/cli-reference",
    keywords: [
      "analyze",
      "init",
      "flags",
      "options",
      "format",
      "json",
      "markdown",
      "exit codes",
      "no-ai",
      "fail-on-critical",
    ],
  },
  {
    title: "CI Integration",
    slug: "/docs/ci-integration",
    keywords: [
      "github actions",
      "ci",
      "cd",
      "sarif",
      "pipeline",
      "gate",
      "fail-on-critical",
      "automation",
    ],
  },
  {
    title: "Supported Languages",
    slug: "/docs/languages",
    keywords: [
      "rust",
      "typescript",
      "javascript",
      "python",
      "go",
      "tree-sitter",
      "extensions",
      "test detection",
    ],
  },
];
