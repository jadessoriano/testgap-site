"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".docs-content h2[id], .docs-content h3[id]"
    );
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    const elements = document.querySelectorAll(
      ".docs-content h2[id], .docs-content h3[id]"
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20 space-y-1">
        <p className="text-xs font-bold text-terminal-dim uppercase tracking-wider mb-3">
          On this page
        </p>
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block text-xs py-1 transition-colors ${
              h.level === 3 ? "pl-3" : ""
            } ${
              activeId === h.id
                ? "text-green"
                : "text-terminal-dim hover:text-terminal-text"
            }`}
          >
            {h.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
