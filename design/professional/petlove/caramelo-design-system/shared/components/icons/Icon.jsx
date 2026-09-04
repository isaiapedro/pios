import React from "react";
import { ICONS } from "./iconRegistry.js";

/**
 * Caramelo icon. Renders a real Petlove glyph by name, sized in px, painting
 * with currentColor so it inherits text color (or pass `color`).
 */
export function Icon({ name, size = 24, color, title, className, style, ...rest }) {
  const def = ICONS[name];
  if (!def) {
    return (
      <span
        role="img"
        aria-label={title || name}
        className={className}
        style={{ display: "inline-block", width: size, height: size, ...style }}
        {...rest}
      />
    );
  }
  const [, , vbw, vbh] = def.vb.split(/\s+/).map(Number);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
      style={{ display: "inline-block", flexShrink: 0, color, ...style }}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <g transform={`translate(${def.left} ${def.top})`}>
        {def.paths.map((p, i) => (
          <path key={i} d={p.d} fill="currentColor" fillRule={p.fr} clipRule={p.fr} />
        ))}
      </g>
    </svg>
  );
}

export default Icon;
