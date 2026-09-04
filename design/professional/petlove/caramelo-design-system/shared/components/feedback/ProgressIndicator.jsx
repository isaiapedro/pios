import React from "react";

/** Caramelo ProgressIndicator — linear bar or circular spinner. */
export function ProgressIndicator({ value, variant = "linear", size = 40, thickness = 4, indeterminate = false, className, style, ...rest }) {
  if (variant === "circular") {
    const r = (size - thickness) / 2;
    const c = 2 * Math.PI * r;
    const pct = indeterminate ? 0.25 : Math.max(0, Math.min(1, (value ?? 0) / 100));
    return (
      <span className={className} role="progressbar" style={{ display: "inline-flex", width: size, height: size, ...style }} {...rest}>
        <svg width={size} height={size} style={{ animation: indeterminate ? "caramelo-rot 1s linear infinite" : "none" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--c-surface-sand)" strokeWidth={thickness} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--c-brand)" strokeWidth={thickness}
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        </svg>
        <style>{"@keyframes caramelo-rot{to{transform:rotate(360deg)}}"}</style>
      </span>
    );
  }
  const pct = Math.max(0, Math.min(100, value ?? 0));
  return (
    <span className={className} role="progressbar" style={{ display: "block", width: "100%", height: thickness + 2, background: "var(--c-surface-sand)", borderRadius: "var(--radius-pill)", overflow: "hidden", ...style }} {...rest}>
      <span style={{
        display: "block", height: "100%", borderRadius: "var(--radius-pill)", background: "var(--c-brand)",
        width: indeterminate ? "40%" : `${pct}%`,
        animation: indeterminate ? "caramelo-slide 1.2s ease infinite" : "none",
        transition: "width .3s ease",
      }} />
      <style>{"@keyframes caramelo-slide{0%{margin-left:-40%}100%{margin-left:100%}}"}</style>
    </span>
  );
}

export default ProgressIndicator;
