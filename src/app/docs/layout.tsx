"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { SearchModal } from "@/components/search-modal";
import { DocsNav } from "@/components/docs-layout";
import { TableOfContents } from "@/components/table-of-contents";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-16 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-bold text-terminal-dim uppercase tracking-wider mb-3 px-3">
              Documentation
            </p>
            <DocsNav />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 docs-content">{children}</main>

        {/* Table of contents */}
        <TableOfContents />
      </div>
    </>
  );
}
