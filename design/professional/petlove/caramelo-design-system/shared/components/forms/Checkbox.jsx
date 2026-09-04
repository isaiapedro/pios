import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo Checkbox — controlled or uncontrolled, with optional label. */
export function Checkbox({ checked, defaultChecked, label, disabled = false, onChange, id, className, style, ...rest }) {
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
      <input id={fieldId} type="checkbox" checked={on} onChange={toggle} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} {...rest} />
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 22, height: 22, borderRadius: "var(--radius-xxs)",
        background: on ? "var(--c-brand)" : "var(--c-bg)",
        border: `2px solid ${on ? "var(--c-brand)" : "var(--c-border-strong)"}`,
        transition: "background .15s ease, border-color .15s ease", flexShrink: 0,
      }}>
        {on && <Icon name="check" size={16} color="var(--c-on-brand)" />}
      </span>
      {label && <span style={{ fontSize: 15, color: "var(--c-text)" }}>{label}</span>}
    </label>
  );
}

export default Checkbox;
