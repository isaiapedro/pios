import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo BottomNav — the mobile tab bar with icon + label items. */
export function BottomNav({ items = [], value, defaultValue, onChange, className, style, ...rest }) {
  const isControlled = value !== undefined;
  const first = defaultValue ?? (items[0] && items[0].value);
  const [internal, setInternal] = React.useState(first);
  const active = isControlled ? value : internal;
  const select = (v) => { if (!isControlled) setInternal(v); onChange && onChange(v); };
  return (
    <nav className={className} style={{
      display: "flex", alignItems: "stretch", justifyContent: "space-around",
      background: "var(--c-bg)", borderTop: "1px solid var(--c-border)",
      padding: "6px 4px", fontFamily: "var(--font-plain)", ...style,
    }} {...rest}>
      {items.map((it) => {
        const on = it.value === active;
        return (
          <button key={it.value} onClick={() => select(it.value)} aria-current={on ? "page" : undefined} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            border: "none", background: "transparent", cursor: "pointer", padding: "6px 0",
            color: on ? "var(--c-brand)" : "var(--c-text-muted)",
          }}>
            <Icon name={it.icon} size={24} />
            <span style={{ fontSize: 11, fontWeight: on ? "var(--fw-bold)" : "var(--fw-medium)" }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
