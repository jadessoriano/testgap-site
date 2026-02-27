"use client";

export function CommandLine({
  command,
  output,
}: {
  command: string;
  output?: string;
}) {
  return (
    <div className="font-mono text-sm">
      <div className="flex items-center gap-2">
        <span className="text-green select-none">$</span>
        <span className="text-terminal-text">{command}</span>
      </div>
      {output && (
        <div className="mt-1 text-terminal-dim whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
}
