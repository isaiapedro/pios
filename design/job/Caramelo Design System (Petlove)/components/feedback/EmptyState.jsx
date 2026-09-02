import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo EmptyState — centered icon + message + optional action. */
export function EmptyState({ icon = "search", title, description, action, className, style, ...rest }) {
  return (
    <div className={className} style={{
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      gap: 8, padding: 32, fontFamily: "var(--font-plain)", ...style,
    }} {...rest}>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 72, height: 72, borderRadius: "var(--radius-pill)",
        background: "var(--c-brand-faint)", color: "var(--c-brand)", marginBottom: 4,
      }}>
        <Icon name={icon} size={36} />
      </span>
      {title && <strong style={{ fontFamily: "var(--font-brand)", fontSize: 20, color: "var(--c-text)" }}>{title}</strong>}
      {description && <span style={{ fontSize: 14, color: "var(--c-text-muted)", maxWidth: 320, lineHeight: "var(--lh-normal)" }}>{description}</span>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}

export default EmptyState;
