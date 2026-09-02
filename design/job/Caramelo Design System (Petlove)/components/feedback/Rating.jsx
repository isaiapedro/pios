import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo Rating — star rating display with optional review count. */
export function Rating({ value = 0, max = 5, size = 16, count, showValue = false, className, style, ...rest }) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "var(--font-plain)", ...style }} {...rest}>
      <span style={{ display: "inline-flex", gap: 1 }}>
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.round(value);
          return <Icon key={i} name="star" size={size} color={filled ? "var(--c-warning)" : "var(--c-border-strong)"} />;
        })}
      </span>
      {showValue && <span style={{ fontSize: 13, fontWeight: "var(--fw-bold)", color: "var(--c-text)" }}>{value.toFixed(1)}</span>}
      {count != null && <span style={{ fontSize: 13, color: "var(--c-text-muted)" }}>({count})</span>}
    </span>
  );
}

export default Rating;
