import React from "react";
import { Icon } from "../icons/Icon.jsx";

/**
 * Caramelo IconButton — a circular/pill icon-only action.
 */
export function IconButton({
  name,
  type = "default",
  weight = "primary",
  size = "md",
  disabled = false,
  ariaLabel,
  onClick,
  className,
  style,
  ...rest
}) {
  const palette = {
    default: { main: "var(--c-brand)", strong: "var(--c-brand-strong)", soft: "var(--c-brand-soft)", on: "var(--c-on-brand)" },
    danger:  { main: "var(--c-danger)", strong: "var(--c-danger-strong)", soft: "var(--c-danger-soft)", on: "var(--c-on-brand)" },
    neutral: { main: "var(--c-text-secondary)", strong: "var(--c-text)", soft: "var(--c-surface-sand)", on: "var(--c-on-brand)" },
  }[type] || { main: "var(--c-brand)", strong: "var(--c-brand-strong)", soft: "var(--c-brand-soft)", on: "var(--c-on-brand)" };

  const dim = { sm: 40, md: 48, lg: 56 }[size];
  const iconSize = { sm: 20, md: 24, lg: 24 }[size];

  const byWeight = {
    primary:   { background: palette.main, color: palette.on, borderColor: palette.main },
    secondary: { background: "transparent", color: palette.main, borderColor: "var(--c-border-strong)" },
    ghost:     { background: "transparent", color: palette.main, borderColor: "transparent" },
  }[weight] || {};

  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? (
    weight === "primary" ? { background: palette.strong, borderColor: palette.strong } : { background: palette.soft }
  ) : null;

  return (
    <button
      type="button"
      aria-label={ariaLabel || name}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: dim, height: dim, borderRadius: "var(--radius-pill)",
        border: "2px solid transparent", cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1, padding: 0,
        transition: "background .16s ease, border-color .16s ease",
        ...byWeight, ...hoverStyle, ...style,
      }}
      {...rest}
    >
      <Icon name={name} size={iconSize} />
    </button>
  );
}

export default IconButton;
