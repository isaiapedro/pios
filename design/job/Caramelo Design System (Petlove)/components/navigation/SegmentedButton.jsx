import React from "react";

/** Caramelo SegmentedButton — a pill segmented control. */
export function SegmentedButton({ options = [], value, defaultValue, onChange, size = "md", className, style, ...rest }) {
  const isControlled = value !== undefined;
  const first = defaultValue ?? (options[0] && (options[0].value ?? options[0]));
  const [internal, setInternal] = React.useState(first);
  const active = isControlled ? value : internal;
  const select = (v) => { if (!isControlled) setInternal(v); onChange && onChange(v); };
  const h = { sm: 36, md: 44 }[size] || 44;
  return (
    <div role="group" className={className} style={{
      display: "inline-flex", padding: 4, gap: 2, background: "var(--c-surface-cream)",
      border: "1px solid var(--c-border)", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-plain)", ...style,
    }} {...rest}>
      {options.map((o) => {
        const opt = typeof o === "string" ? { value: o, label: o } : o;
        const on = opt.value === active;
        return (
          <button key={opt.value} onClick={() => select(opt.value)} aria-pressed={on} style={{
            height: h, padding: "0 18px", border: "none", borderRadius: "var(--radius-pill)",
            cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "var(--fw-semibold)",
            background: on ? "var(--c-bg)" : "transparent", color: on ? "var(--c-brand)" : "var(--c-text-secondary)",
            boxShadow: on ? "var(--shadow-xs)" : "none", transition: "background .15s ease, color .15s ease", whiteSpace: "nowrap",
          }}>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedButton;
