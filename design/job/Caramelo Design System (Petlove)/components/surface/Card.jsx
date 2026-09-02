import React from "react";

/**
 * Caramelo Card — the base surface container. Rounded 20px, warm hairline
 * border, soft brown shadow. `interactive` adds hover elevation.
 */
export function Card({ children, padding = 20, interactive = false, elevated = false, className, style, onClick, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        background: "var(--c-bg)",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: elevated ? "var(--shadow-md)" : interactive && hover ? "var(--shadow-md)" : "var(--shadow-xs)",
        transform: interactive && hover ? "translateY(-2px)" : "none",
        transition: "box-shadow .18s ease, transform .18s ease",
        cursor: interactive || onClick ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
