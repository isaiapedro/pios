import React from "react";

/** Caramelo Tooltip — hover/focus label on a target element. */
export function Tooltip({ label, placement = "top", children, className, style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top:    { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8 },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8 },
    left:   { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 8 },
    right:  { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8 },
  }[placement];
  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      {...rest}
    >
      {children}
      {open && (
        <span role="tooltip" style={{
          position: "absolute", zIndex: 50, ...pos,
          background: "var(--grey-900)", color: "var(--c-on-brand)",
          padding: "6px 10px", borderRadius: "var(--radius-xs)",
          fontFamily: "var(--font-plain)", fontSize: 12, fontWeight: "var(--fw-medium)",
          whiteSpace: "nowrap", boxShadow: "var(--shadow-md)", pointerEvents: "none",
        }}>{label}</span>
      )}
    </span>
  );
}

export default Tooltip;
