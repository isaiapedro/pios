import React from "react";
import { Icon } from "../icons/Icon.jsx";

/**
 * Caramelo Alert — an inline contextual message (info / success / warning / danger).
 */
export function Alert({ color = "info", title, children, onClose, icon, className, style, ...rest }) {
  const map = {
    info:    { bg: "var(--c-info-soft)", fg: "var(--c-info-strong)", bd: "var(--blue-300)", icon: "info" },
    success: { bg: "var(--c-success-soft)", fg: "var(--c-success-strong)", bd: "var(--green-300)", icon: "success" },
    warning: { bg: "var(--c-warning-soft)", fg: "var(--c-warning-strong)", bd: "var(--yellow-300)", icon: "warning" },
    danger:  { bg: "var(--c-danger-soft)", fg: "var(--c-danger-strong)", bd: "var(--red-300)", icon: "danger" },
    brand:   { bg: "var(--c-brand-faint)", fg: "var(--c-brand-strong)", bd: "var(--c-brand-soft)", icon: "info" },
  }[color];
  return (
    <div role="status" className={className} style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      padding: 16, background: map.bg, border: `1px solid ${map.bd}`,
      borderRadius: "var(--radius-md)", fontFamily: "var(--font-plain)", color: "var(--c-text)", ...style,
    }} {...rest}>
      <span style={{ color: map.fg, flexShrink: 0, marginTop: 1 }}><Icon name={icon || map.icon} size={22} /></span>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {title && <strong style={{ fontSize: 15, fontWeight: "var(--fw-bold)", color: map.fg }}>{title}</strong>}
        {children && <span style={{ fontSize: 14, color: "var(--c-text-secondary)", lineHeight: "var(--lh-normal)" }}>{children}</span>}
      </div>
      {onClose && (
        <button type="button" aria-label="Fechar" onClick={onClose} style={{ border: "none", background: "none", padding: 0, cursor: "pointer", color: map.fg, display: "inline-flex" }}>
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  );
}

export default Alert;
