"use client";

import { useEffect, useRef, useState } from "react";

export function TerminalWindow({
  title = "terminal",
  children,
  className = "",
  typing = false,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  typing?: boolean;
}) {
  return (
    <div className={`terminal-chrome bg-terminal-bg ${className}`}>
      <div className="terminal-title-bar">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-2 text-xs text-terminal-dim">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

export function TerminalTyping({
  lines,
  speed = 30,
  lineDelay = 400,
  title = "terminal",
}: {
  lines: { text: string; className?: string }[];
  speed?: number;
  lineDelay?: number;
  title?: string;
}) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || currentLine >= lines.length) return;
    const line = lines[currentLine].text;
    if (currentChar < line.length) {
      const timer = setTimeout(() => setCurrentChar((c) => c + 1), speed);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, line]);
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, lineDelay);
    return () => clearTimeout(timer);
  }, [started, currentLine, currentChar, lines, speed, lineDelay]);

  return (
    <div ref={ref}>
      <TerminalWindow title={title}>
        {displayedLines.map((text, i) => (
          <div key={i} className={lines[i]?.className || ""}>
            {text}
          </div>
        ))}
        {currentLine < lines.length && (
          <div className={lines[currentLine]?.className || ""}>
            {lines[currentLine].text.slice(0, currentChar)}
            <span className="cursor-blink" />
          </div>
        )}
      </TerminalWindow>
    </div>
  );
}
