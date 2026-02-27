"use client";

import Link from "next/link";
import { TerminalWindow } from "@/components/terminal-window";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <TerminalWindow title="bash — 404">
          <div className="space-y-2">
            <div>
              <span className="text-green">$</span>{" "}
              <span className="text-terminal-text">
                cat /page/you-requested
              </span>
            </div>
            <div className="text-red">
              cat: /page/you-requested: No such file or directory
            </div>
            <div className="mt-4">
              <span className="text-green">$</span>{" "}
              <span className="text-terminal-text">echo $?</span>
            </div>
            <div className="text-amber">404</div>
            <div className="mt-4">
              <span className="text-green">$</span>{" "}
              <span className="text-terminal-dim">
                # Try one of these instead:
              </span>
            </div>
            <div className="mt-2 space-y-1">
              <div>
                <span className="text-green">$</span>{" "}
                <Link
                  href="/"
                  className="text-green-light hover:text-green underline"
                >
                  cd /home
                </Link>
              </div>
              <div>
                <span className="text-green">$</span>{" "}
                <Link
                  href="/docs"
                  className="text-green-light hover:text-green underline"
                >
                  cd /docs
                </Link>
              </div>
              <div>
                <span className="text-green">$</span>{" "}
                <Link
                  href="/docs/cli-reference"
                  className="text-green-light hover:text-green underline"
                >
                  man testgap
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green">$</span>
              <span className="cursor-blink" />
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
