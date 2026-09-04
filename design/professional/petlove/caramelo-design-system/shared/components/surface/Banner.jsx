import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * Caramelo Banner — a promotional surface (brand or cream) with title,
 * subtitle, CTA, and optional artwork on the right.
 */
export function Banner({ title, subtitle, cta, onCta, tone = "brand", image, className, style, ...rest }) {
  const tones = {
    brand: { bg: "var(--c-brand)", fg: "var(--c-on-brand)", sub: "rgba(255,255,255,0.82)", btnType: "inverted" },
    cream: { bg: "var(--c-surface-cream)", fg: "var(--c-text)", sub: "var(--c-text-secondary)", btnType: "default" },
    heart: { bg: "var(--c-heart)", fg: "var(--c-on-brand)", sub: "rgba(255,255,255,0.85)", btnType: "inverted" },
  }[tone];
  return (
    <div className={className} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
      padding: 24, background: tones.bg, borderRadius: "var(--radius-lg)",
      overflow: "hidden", fontFamily: "var(--font-plain)", ...style,
    }} {...rest}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 460 }}>
        {title && <strong style={{ fontFamily: "var(--font-brand)", fontSize: 26, fontWeight: "var(--fw-bold)", color: tones.fg, lineHeight: "var(--lh-tight)" }}>{title}</strong>}
        {subtitle && <span style={{ fontSize: 15, color: tones.sub, lineHeight: "var(--lh-normal)" }}>{subtitle}</span>}
        {cta && <div style={{ marginTop: 10 }}><Button type={tones.btnType} weight="primary" size="md" onClick={onCta}>{cta}</Button></div>}
      </div>
      {image && <img src={image} alt="" style={{ height: 120, objectFit: "contain", flexShrink: 0 }} />}
    </div>
  );
}

export default Banner;
