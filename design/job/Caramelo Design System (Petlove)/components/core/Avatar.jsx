import React from "react";

/**
 * Caramelo Avatar — circular image, initials, or icon, with optional status ring.
 */
export function Avatar({ src, alt = "", initials, size = "md", ring = false, className, style, ...rest }) {
  const dim = { xs: 24, sm: 32, md: 48, lg: 56, xl: 80 }[size] || 48;
  const fs = Math.round(dim * 0.4);
  return (
    <span
      className={className}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: dim, height: dim, borderRadius: "var(--radius-pill)",
        background: "var(--c-brand-faint)", color: "var(--c-brand)",
        fontFamily: "var(--font-plain)", fontSize: fs, fontWeight: "var(--fw-bold)",
        overflow: "hidden", flexShrink: 0,
        boxShadow: ring ? "0 0 0 2px var(--c-bg), 0 0 0 4px var(--c-brand)" : undefined,
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <span>{initials}</span>
      )}
    </span>
  );
}

export default Avatar;
