import React from "react";

/** Caramelo Switch — on/off toggle. */
export function Switch({ checked, defaultChecked, label, disabled = false, onChange, id, className, style, ...rest }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const fieldId = id || React.useId();
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };
  return (
    <label htmlFor={fieldId} className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, fontFamily: "var(--font-plain)", ...style }}>
      <input id={fieldId} type="checkbox" role="switch" checked={on} onChange={toggle} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} {...rest} />
      <span style={{
        position: "relative", width: 48, height: 28, borderRadius: "var(--radius-pill)",
        background: on ? "var(--c-brand)" : "var(--c-border-strong)",
        transition: "background .18s ease", flexShrink: 0,
      }}>
        <span style={{
          position: "absolute", top: 3, left: on ? 23 : 3,
          width: 22, height: 22, borderRadius: "50%", background: "var(--c-bg)",
          boxShadow: "var(--shadow-sm)", transition: "left .18s ease",
        }} />
      </span>
      {label && <span style={{ fontSize: 15, color: "var(--c-text)" }}>{label}</span>}
    </label>
  );
}

export default Switch;
