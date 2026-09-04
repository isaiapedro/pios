import React from "react";
import { Icon } from "../icons/Icon.jsx";

/**
 * Caramelo Tag — a label chip, optionally with a leading icon and removable.
 */
export function Tag({ children, color = "neutral", icon = null, onRemove, className, style, ...rest }) {
  const colors = {
    neutral: { bg: "var(--c-surface-cream)", fg: "var(--c-text-secondary)", bd: "var(--c-border)" },
    brand:   { bg: "var(--c-brand-faint)", fg: "var(--c-brand-strong)", bd: "var(--c-brand-soft)" },
    success: { bg: "var(--c-success-soft)", fg: "var(--c-success-strong)", bd: "var(--green-300)" },
    danger:  { bg: "var(--c-danger-soft)", fg: "var(--c-danger-strong)", bd: "var(--red-300)" },
  }[color] || {};
  return (
    <span
      className={className}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        height: 28, padding: "0 12px",
        fontFamily: "var(--font-plain)", fontSize: 13, fontWeight: "var(--fw-medium)",
        color: colors.fg, background: colors.bg,
        border: `1px solid ${colors.bd}`, borderRadius: "var(--radius-pill)",
        ...style,
      }}
      {...rest}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
      {onRemove && (
        <button
          type="button" aria-label="Remover" onClick={onRemove}
          style={{ display: "inline-flex", border: "none", background: "none", padding: 0, marginRight: -4, cursor: "pointer", color: "inherit" }}
        >
          <Icon name="close" size={14} />
        </button>
      )}
    </span>
  );
}

export default Tag;
