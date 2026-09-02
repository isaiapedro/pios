import React from "react";

/** Caramelo Divider — a 1px warm hairline, horizontal or vertical. */
export function Divider({ orientation = "horizontal", className, style, ...rest }) {
  const v = orientation === "vertical";
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={className}
      style={{
        background: "var(--c-border)",
        width: v ? 1 : "100%",
        height: v ? "100%" : 1,
        alignSelf: "stretch",
        border: "none",
        ...style,
      }}
      {...rest}
    />
  );
}

export default Divider;
