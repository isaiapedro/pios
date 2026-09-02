import React from "react";

/** Caramelo Tabs — underline tab bar. Controlled or uncontrolled. */
export function Tabs({ tabs = [], value, defaultValue, onChange, className, style, ...rest }) {
  const isControlled = value !== undefined;
  const first = defaultValue ?? (tabs[0] && (tabs[0].value ?? tabs[0]));
  const [internal, setInternal] = React.useState(first);
  const active = isControlled ? value : internal;
  const select = (v) => { if (!isControlled) setInternal(v); onChange && onChange(v); };
  return (
    <div role="tablist" className={className} style={{ display: "flex", gap: 4, borderBottom: "2px solid var(--c-border)", fontFamily: "var(--font-plain)", ...style }} {...rest}>
      {tabs.map((t) => {
        const tab = typeof t === "string" ? { value: t, label: t } : t;
        const on = tab.value === active;
        return (
          <button key={tab.value} role="tab" aria-selected={on} onClick={() => select(tab.value)} style={{
            position: "relative", padding: "12px 16px", border: "none", background: "transparent",
            cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: on ? "var(--fw-bold)" : "var(--fw-medium)",
            color: on ? "var(--c-brand)" : "var(--c-text-muted)", marginBottom: -2, whiteSpace: "nowrap",
            borderBottom: `2px solid ${on ? "var(--c-brand)" : "transparent"}`, transition: "color .15s ease",
          }}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
