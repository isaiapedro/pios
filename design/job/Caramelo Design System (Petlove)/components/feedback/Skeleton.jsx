import React from "react";

/** Caramelo Skeleton — shimmer loading placeholder. */
export function Skeleton({ width = "100%", height = 16, radius = "var(--radius-xs)", circle = false, className, style, ...rest }) {
  const dim = circle ? { width: height, height, borderRadius: "var(--radius-pill)" } : { width, height, borderRadius: radius };
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        background: "linear-gradient(90deg, var(--c-surface-sand) 25%, var(--c-surface-cream) 37%, var(--c-surface-sand) 63%)",
        backgroundSize: "400% 100%",
        animation: "caramelo-shimmer 1.4s ease infinite",
        ...dim, ...style,
      }}
      {...rest}
    >
      <style>{"@keyframes caramelo-shimmer{0%{background-position:100% 50%}100%{background-position:0 50%}}"}</style>
    </span>
  );
}

export default Skeleton;
