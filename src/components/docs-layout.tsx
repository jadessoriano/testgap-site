"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Info, AlertTriangle } from "lucide-react";
import { docPages } from "@/lib/docs-meta";

export function DocsNav() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {docPages.map((page) => (
        <Link
          key={page.slug}
          href={page.slug}
          className={`block text-sm px-3 py-2 rounded transition-colors ${
            pathname === page.slug
              ? "text-green bg-green/5 border-l-2 border-green"
              : "text-terminal-dim hover:text-terminal-text hover:bg-terminal-surface"
          }`}
        >
          {page.shortTitle}
        </Link>
      ))}
    </nav>
  );
}

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-terminal-dim mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-green transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-terminal-text">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export function InfoBox({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning";
  title?: string;
  children: React.ReactNode;
}) {
  const isWarning = type === "warning";
  return (
    <div
      className={`my-4 rounded-lg border p-4 text-sm ${
        isWarning
          ? "border-amber/30 bg-amber/5"
          : "border-green/20 bg-green/5"
      }`}
    >
      <div className="flex items-start gap-2">
        {isWarning ? (
          <AlertTriangle className="w-4 h-4 text-amber mt-0.5 shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-green mt-0.5 shrink-0" />
        )}
        <div>
          {title && (
            <p
              className={`font-bold mb-1 ${
                isWarning ? "text-amber" : "text-green"
              }`}
            >
              {title}
            </p>
          )}
          <div className="text-terminal-dim leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function PropTable({
  rows,
}: {
  rows: { name: string; type: string; default?: string; description: string }[];
}) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-terminal-border">
            <th className="text-left py-2 pr-4 text-green font-bold">Option</th>
            <th className="text-left py-2 pr-4 text-green font-bold">Type</th>
            <th className="text-left py-2 pr-4 text-green font-bold">Default</th>
            <th className="text-left py-2 text-green font-bold">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              className="border-b border-terminal-border/50"
            >
              <td className="py-2 pr-4 text-amber font-mono text-xs">
                {row.name}
              </td>
              <td className="py-2 pr-4 text-purple font-mono text-xs">
                {row.type}
              </td>
              <td className="py-2 pr-4 text-terminal-dim font-mono text-xs">
                {row.default || "—"}
              </td>
              <td className="py-2 text-terminal-dim">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AnchorHeading({
  id,
  level = 2,
  children,
}: {
  id: string;
  level?: 2 | 3;
  children: React.ReactNode;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id} className="group scroll-mt-20">
      <a href={`#${id}`} className="no-underline hover:underline">
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-terminal-dim">
          #
        </span>
      </a>
    </Tag>
  );
}
