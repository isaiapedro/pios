import React from "react";

/**
 * Caramelo Badge — a small status/count pill.
 */
export function Badge({ children, color = "brand", variant = "soft", size = "md", className, style, ...rest }) {
  const colors = {
    brand:   { soft: "var(--c-brand-soft)",   solidBg: "var(--c-brand)",   softFg: "var(--c-brand-strong)" },
    neutral: { soft: "var(--c-surface-sand)", solidBg: "var(--c-text-secondary)", softFg: "var(--c-text-secondary)" },
    success: { soft: "var(--c-success-soft)", solidBg: "var(--c-success)", softFg: "var(--c-success-strong)" },
    danger:  { soft: "var(--c-danger-soft)",  solidBg: "var(--c-danger)",  softFg: "var(--c-danger-strong)" },
    warning: { soft: "var(--c-warning-soft)", solidBg: "var(--c-warning)", softFg: "var(--c-warning-strong)" },
    info:    { soft: "var(--c-info-soft)",    solidBg: "var(--c-info)",    softFg: "var(--c-info-strong)" },
    heart:   { soft: "var(--red-200)",        solidBg: "var(--c-heart)",   softFg: "var(--red-700)" },
  }[color] || {};
  const dims = { sm: { h: 18, px: 6, fs: 11 }, md: { h: 22, px: 8, fs: 12 } }[size];
  const isSolid = variant === "solid";
  return (
    <span
      className={className}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        height: dims.h, minWidth: dims.h, padding: `0 ${dims.px}px`,
        fontFamily: "var(--font-plain)", fontSize: dims.fs, fontWeight: "var(--fw-bold)",
        lineHeight: 1, borderRadius: "var(--radius-pill)",
        background: isSolid ? colors.solidBg : colors.soft,
        color: isSolid ? "var(--c-on-brand)" : colors.softFg,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Badge;
