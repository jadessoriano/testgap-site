"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DocPage } from "@/lib/docs-meta";

export function DocsPrevNext({
  prev,
  next,
}: {
  prev: DocPage | null;
  next: DocPage | null;
}) {
  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t border-terminal-border">
      {prev ? (
        <Link
          href={prev.slug}
          className="flex items-center gap-2 text-sm text-terminal-dim hover:text-green transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <div>
            <div className="text-xs text-terminal-dim">Previous</div>
            <div className="text-terminal-text group-hover:text-green transition-colors">
              {prev.shortTitle}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.slug}
          className="flex items-center gap-2 text-sm text-terminal-dim hover:text-green transition-colors group text-right"
        >
          <div>
            <div className="text-xs text-terminal-dim">Next</div>
            <div className="text-terminal-text group-hover:text-green transition-colors">
              {next.shortTitle}
            </div>
          </div>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
