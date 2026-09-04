import React from "react";

/** Caramelo Radio — single radio control with label. */
export function Radio({ checked, defaultChecked, label, name, value, disabled = false, onChange, id, className, style, ...rest }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const fieldId = id || React.useId();
  const select = () => {
    if (disabled) return;
    if (!isControlled) setInternal(true);
    onChange && onChange(value ?? true);
  };
  return (
    <label htmlFor={fieldId} className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, fontFamily: "var(--font-plain)", ...style }}>
      <input id={fieldId} type="radio" name={name} value={value} checked={on} onChange={select} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} {...rest} />
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 22, height: 22, borderRadius: "var(--radius-pill)",
        background: "var(--c-bg)",
        border: `2px solid ${on ? "var(--c-brand)" : "var(--c-border-strong)"}`,
        transition: "border-color .15s ease", flexShrink: 0,
      }}>
        {on && <span style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--c-brand)" }} />}
      </span>
      {label && <span style={{ fontSize: 15, color: "var(--c-text)" }}>{label}</span>}
    </label>
  );
}

export default Radio;
