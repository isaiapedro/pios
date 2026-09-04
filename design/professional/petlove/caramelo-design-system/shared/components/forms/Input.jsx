import React from "react";

/**
 * Caramelo TextField — labelled text input with helper/error states.
 */
export function Input({
  label,
  value,
  defaultValue,
  placeholder,
  type = "text",
  helper,
  error,
  disabled = false,
  prefix = null,
  suffix = null,
  onChange,
  id,
  className,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || React.useId();
  const borderColor = error ? "var(--c-danger)" : focus ? "var(--c-brand)" : "var(--c-border-strong)";
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-plain)", ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontSize: 13, fontWeight: "var(--fw-medium)", color: "var(--c-text-secondary)" }}>
          {label}
        </label>
      )}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 8,
          height: 48, padding: "0 16px",
          background: disabled ? "var(--c-surface-cream)" : "var(--c-bg)",
          border: `2px solid ${borderColor}`, borderRadius: "var(--radius-sm)",
          boxShadow: focus && !error ? "var(--shadow-focus)" : "none",
          transition: "border-color .15s ease, box-shadow .15s ease",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {prefix}
        <input
          id={fieldId} type={type} value={value} defaultValue={defaultValue}
          placeholder={placeholder} disabled={disabled} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: "inherit", fontSize: 16, color: "var(--c-text)", minWidth: 0,
          }}
          {...rest}
        />
        {suffix}
      </div>
      {(error || helper) && (
        <span style={{ fontSize: 12, color: error ? "var(--c-danger)" : "var(--c-text-muted)" }}>
          {error || helper}
        </span>
      )}
    </div>
  );
}

export default Input;
