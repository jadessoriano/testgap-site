"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Github, Search } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/docs/cli-reference", label: "CLI" },
  { href: "https://github.com/jadessoriano/testgap", label: "GitHub", external: true },
];

export function Navbar({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-terminal-border bg-terminal-bg/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-green font-bold glow-green group-hover:glow-green-strong transition-all">
            testgap
          </span>
          <span className="text-terminal-dim text-xs hidden sm:inline">
            v0.2.0
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {onSearchOpen && (
            <button
              onClick={onSearchOpen}
              className="flex items-center gap-2 text-xs text-terminal-dim hover:text-green transition-colors border border-terminal-border rounded px-2.5 py-1"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="text-[10px] border border-terminal-border rounded px-1">
                ⌘K
              </kbd>
            </button>
          )}
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-terminal-dim hover:text-green transition-colors flex items-center gap-1"
              >
                <Github className="w-4 h-4" />
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href))
                    ? "text-green"
                    : "text-terminal-dim hover:text-terminal-text"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-terminal-dim hover:text-green"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-terminal-border bg-terminal-bg px-4 py-4 space-y-3">
          {onSearchOpen && (
            <button
              onClick={() => {
                setMobileOpen(false);
                onSearchOpen();
              }}
              className="flex items-center gap-2 text-sm text-terminal-dim hover:text-green"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          )}
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-terminal-dim hover:text-green"
              >
                GitHub
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm ${
                  pathname === link.href
                    ? "text-green"
                    : "text-terminal-dim hover:text-terminal-text"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
