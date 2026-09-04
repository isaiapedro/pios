import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo Chip — a selectable filter/choice pill. */
export function Chip({ children, selected = false, icon, onClick, disabled = false, className, style, ...rest }) {
  return (
    <button
      type="button" onClick={onClick} disabled={disabled} aria-pressed={selected}
      className={className}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        height: 36, padding: icon ? "0 14px 0 12px" : "0 16px",
        fontFamily: "var(--font-plain)", fontSize: 14, fontWeight: "var(--fw-medium)",
        borderRadius: "var(--radius-pill)", cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        background: selected ? "var(--c-brand-faint)" : "var(--c-bg)",
        color: selected ? "var(--c-brand-strong)" : "var(--c-text-secondary)",
        border: `1.5px solid ${selected ? "var(--c-brand)" : "var(--c-border-strong)"}`,
        transition: "background .15s ease, border-color .15s ease, color .15s ease",
        ...style,
      }}
      {...rest}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
      {selected && <Icon name="check" size={16} />}
    </button>
  );
}

export default Chip;
