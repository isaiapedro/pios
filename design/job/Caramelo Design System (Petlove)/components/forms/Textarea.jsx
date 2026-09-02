import React from "react";

/** Caramelo Textarea — multiline input matching the TextField styling. */
export function Textarea({ label, value, defaultValue, placeholder, rows = 4, helper, error, disabled = false, onChange, id, className, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || React.useId();
  const borderColor = error ? "var(--c-danger)" : focus ? "var(--c-brand)" : "var(--c-border-strong)";
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-plain)", ...style }}>
      {label && <label htmlFor={fieldId} style={{ fontSize: 13, fontWeight: "var(--fw-medium)", color: "var(--c-text-secondary)" }}>{label}</label>}
      <textarea
        id={fieldId} value={value} defaultValue={defaultValue} placeholder={placeholder}
        rows={rows} disabled={disabled} onChange={onChange}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          resize: "vertical", padding: "12px 16px",
          background: disabled ? "var(--c-surface-cream)" : "var(--c-bg)",
          border: `2px solid ${borderColor}`, borderRadius: "var(--radius-sm)",
          boxShadow: focus && !error ? "var(--shadow-focus)" : "none",
          fontFamily: "inherit", fontSize: 16, color: "var(--c-text)", outline: "none",
          transition: "border-color .15s ease, box-shadow .15s ease",
        }}
        {...rest}
      />
      {(error || helper) && <span style={{ fontSize: 12, color: error ? "var(--c-danger)" : "var(--c-text-muted)" }}>{error || helper}</span>}
    </div>
  );
}

export default Textarea;
