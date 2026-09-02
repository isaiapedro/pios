import React from "react";

/**
 * Caramelo Button. Pill-shaped action with a hierarchy of types
 * (default / accent / danger / inverted) and weights (primary / secondary / tertiary).
 */
export function Button({
  children,
  type = "default",
  weight = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  className,
  style,
  ...rest
}) {
  const palette = {
    default: { main: "var(--c-brand)", strong: "var(--c-brand-strong)", soft: "var(--c-brand-soft)", on: "var(--c-on-brand)" },
    accent:  { main: "var(--c-success)", strong: "var(--c-success-strong)", soft: "var(--c-success-soft)", on: "var(--c-on-brand)" },
    danger:  { main: "var(--c-danger)", strong: "var(--c-danger-strong)", soft: "var(--c-danger-soft)", on: "var(--c-on-brand)" },
    inverted:{ main: "var(--c-brand-soft)", strong: "var(--purple-300)", soft: "var(--c-brand-faint)", on: "var(--c-brand)" },
  }[type];

  const sizes = {
    sm: { h: 40, px: 20, fs: 14 },
    md: { h: 48, px: 24, fs: 16 },
    lg: { h: 56, px: 28, fs: 16 },
  }[size];

  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: sizes.h,
    padding: weight === "tertiary" ? `0 4px` : `0 ${sizes.px}px`,
    fontFamily: "var(--font-plain)",
    fontSize: sizes.fs,
    fontWeight: "var(--fw-semibold)",
    lineHeight: 1,
    borderRadius: "var(--radius-pill)",
    border: "2px solid transparent",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "background .16s ease, color .16s ease, border-color .16s ease, transform .08s ease",
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  const byWeight = {
    primary:   { background: palette.main, color: palette.on, borderColor: palette.main },
    secondary: { background: "transparent", color: type === "inverted" ? "var(--c-on-brand)" : palette.main, borderColor: type === "inverted" ? "var(--c-brand-soft)" : "var(--c-border-strong)" },
    tertiary:  { background: "transparent", color: type === "inverted" ? "var(--c-on-brand)" : palette.main, borderColor: "transparent" },
  }[weight];

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const hoverStyle = !disabled && !loading && hover ? (
    weight === "primary"
      ? { background: palette.strong, borderColor: palette.strong }
      : { background: palette.soft }
  ) : null;
  const activeStyle = active && !disabled && !loading ? { transform: "scale(0.97)" } : null;

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      className={className}
      style={{ ...base, ...byWeight, ...hoverStyle, ...activeStyle, ...style }}
      {...rest}
    >
      {loading ? <Spinner color={byWeight.color} /> : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
}

function Spinner({ color }) {
  return (
    <span
      aria-label="loading"
      style={{
        width: 16, height: 16, borderRadius: "50%",
        border: `2px solid ${color}`, borderTopColor: "transparent",
        display: "inline-block", animation: "caramelo-spin .7s linear infinite",
      }}
    >
      <style>{"@keyframes caramelo-spin{to{transform:rotate(360deg)}}"}</style>
    </span>
  );
}

export default Button;
