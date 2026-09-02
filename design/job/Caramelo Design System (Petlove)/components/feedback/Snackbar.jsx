import React from "react";
import { Icon } from "../icons/Icon.jsx";

/**
 * Caramelo Snackbar — a transient dark toast with message and optional action.
 */
export function Snackbar({ message, action, onAction, color = "neutral", icon, className, style, ...rest }) {
  const accent = {
    neutral: "var(--c-on-brand)",
    success: "var(--green-400)",
    danger: "var(--red-400)",
  }[color] || "var(--c-on-brand)";
  return (
    <div role="alert" className={className} style={{
      display: "inline-flex", alignItems: "center", gap: 12,
      padding: "12px 16px", minHeight: 48, maxWidth: 480,
      background: "var(--grey-900)", color: "var(--c-on-brand)",
      borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-plain)", fontSize: 14, ...style,
    }} {...rest}>
      {icon && <span style={{ color: accent, flexShrink: 0 }}><Icon name={icon} size={20} /></span>}
      <span style={{ flex: 1 }}>{message}</span>
      {action && (
        <button type="button" onClick={onAction} style={{
          border: "none", background: "none", padding: "0 4px", cursor: "pointer",
          color: "var(--purple-300)", fontFamily: "inherit", fontSize: 14, fontWeight: "var(--fw-bold)", whiteSpace: "nowrap",
        }}>{action}</button>
      )}
    </div>
  );
}

export default Snackbar;
