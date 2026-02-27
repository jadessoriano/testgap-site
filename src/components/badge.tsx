"use client";

type Severity = "critical" | "warning" | "info";

const severityConfig: Record<Severity, { label: string; className: string }> = {
  critical: { label: "CRITICAL", className: "badge-critical" },
  warning: { label: "WARNING", className: "badge-warning" },
  info: { label: "INFO", className: "badge-info" },
};

export function Badge({ severity }: { severity: Severity }) {
  const config = severityConfig[severity];
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${config.className}`}
    >
      {config.label}
    </span>
  );
}
