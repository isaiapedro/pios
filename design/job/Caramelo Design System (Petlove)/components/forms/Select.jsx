import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo Select — native select styled to match the Caramelo TextField. */
export function Select({ label, value, defaultValue, options = [], placeholder, helper, error, disabled = false, onChange, id, className, style, ...rest }) {
  const fieldId = id || React.useId();
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "var(--c-danger)" : focus ? "var(--c-brand)" : "var(--c-border-strong)";
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-plain)", ...style }}>
      {label && <label htmlFor={fieldId} style={{ fontSize: 13, fontWeight: "var(--fw-medium)", color: "var(--c-text-secondary)" }}>{label}</label>}
      <div style={{
        position: "relative", display: "flex", alignItems: "center",
        height: 48, padding: "0 16px",
        background: disabled ? "var(--c-surface-cream)" : "var(--c-bg)",
        border: `2px solid ${borderColor}`, borderRadius: "var(--radius-sm)",
        boxShadow: focus && !error ? "var(--shadow-focus)" : "none",
        opacity: disabled ? 0.6 : 1, transition: "border-color .15s ease, box-shadow .15s ease",
      }}>
        <select
          id={fieldId} value={value} defaultValue={defaultValue} disabled={disabled} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, appearance: "none", WebkitAppearance: "none", border: "none", outline: "none",
            background: "transparent", fontFamily: "inherit", fontSize: 16,
            color: "var(--c-text)", cursor: disabled ? "not-allowed" : "pointer",
          }}
          {...rest}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <Icon name="chevron-down" size={20} color="var(--c-text-muted)" />
      </div>
      {(error || helper) && <span style={{ fontSize: 12, color: error ? "var(--c-danger)" : "var(--c-text-muted)" }}>{error || helper}</span>}
    </div>
  );
}

export default Select;
