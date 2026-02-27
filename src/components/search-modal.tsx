"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchIndex } from "@/lib/docs-meta";

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? searchIndex.filter(
        (entry) =>
          entry.title.toLowerCase().includes(query.toLowerCase()) ||
          entry.keywords.some((k) =>
            k.toLowerCase().includes(query.toLowerCase())
          )
      )
    : [];

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
        else {
          /* parent handles opening */
        }
      }
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const navigate = (slug: string) => {
    onClose();
    router.push(slug);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg mx-4 terminal-chrome bg-terminal-bg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-terminal-border">
          <Search className="w-4 h-4 text-terminal-dim shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs..."
            className="flex-1 bg-transparent text-sm text-terminal-text placeholder:text-terminal-dim outline-none"
          />
          <button onClick={onClose} className="text-terminal-dim hover:text-green">
            <X className="w-4 h-4" />
          </button>
        </div>
        {query.trim() && (
          <div className="max-h-64 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="text-sm text-terminal-dim px-3 py-4 text-center">
                No results for &ldquo;{query}&rdquo;
              </p>
            ) : (
              results.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => navigate(r.slug)}
                  className="w-full text-left px-3 py-2 rounded text-sm hover:bg-terminal-surface transition-colors group"
                >
                  <span className="text-terminal-text group-hover:text-green transition-colors">
                    {r.title}
                  </span>
                  <span className="block text-xs text-terminal-dim mt-0.5">
                    {r.slug}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
