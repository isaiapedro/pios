import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo Counter — quantity stepper used on product/cart rows. */
export function Counter({ value, defaultValue = 1, min = 0, max = 99, size = "md", onChange, className, style, ...rest }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const v = isControlled ? value : internal;
  const set = (next) => {
    const clamped = Math.max(min, Math.min(max, next));
    if (!isControlled) setInternal(clamped);
    onChange && onChange(clamped);
  };
  const dim = { sm: 32, md: 40 }[size] || 40;
  const btn = (icon, on, dis) => (
    <button type="button" onClick={on} disabled={dis} aria-label={icon === "plus" ? "Aumentar" : "Diminuir"}
      style={{
        width: dim, height: dim, border: "none", borderRadius: "var(--radius-pill)",
        background: "transparent", color: dis ? "var(--c-text-disabled)" : "var(--c-brand)",
        cursor: dis ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
      <Icon name={icon === "plus" ? "plus" : "minus-circle"} size={size === "sm" ? 18 : 22} />
    </button>
  );
  return (
    <div className={className} style={{
      display: "inline-flex", alignItems: "center",
      border: "2px solid var(--c-border-strong)", borderRadius: "var(--radius-pill)",
      background: "var(--c-bg)", padding: 2, fontFamily: "var(--font-plain)", ...style,
    }} {...rest}>
      {btn("minus", () => set(v - 1), v <= min)}
      <span style={{ minWidth: 28, textAlign: "center", fontSize: 16, fontWeight: "var(--fw-bold)", color: "var(--c-text)" }}>{v}</span>
      {btn("plus", () => set(v + 1), v >= max)}
    </div>
  );
}

export default Counter;
