import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const BASE_URL = "https://testgap.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "testgap — AI-Powered Test Gap Finder",
    template: "%s | testgap",
  },
  description:
    "Find untested functions in your codebase using tree-sitter static analysis. Identifies critical test gaps, classifies severity, and optionally uses Claude AI for risk assessment and test suggestions.",
  keywords: [
    "test coverage",
    "test gap analysis",
    "tree-sitter",
    "static analysis",
    "untested functions",
    "AI test suggestions",
    "Claude AI",
    "Rust CLI",
    "code quality",
    "CI integration",
    "SARIF",
    "test detection",
    "coverage tool",
    "TypeScript",
    "Python",
    "Go",
    "JavaScript",
  ],
  authors: [{ name: "testgap" }],
  creator: "testgap",
  openGraph: {
    title: "testgap — AI-Powered Test Gap Finder",
    description:
      "Find untested functions in your codebase using tree-sitter. Classifies severity and suggests tests with Claude AI.",
    url: BASE_URL,
    siteName: "testgap",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "testgap — AI-Powered Test Gap Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "testgap — AI-Powered Test Gap Finder",
    description:
      "Find untested functions with tree-sitter. AI-powered test suggestions.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
