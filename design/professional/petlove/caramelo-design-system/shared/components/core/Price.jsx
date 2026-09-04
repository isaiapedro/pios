import React from "react";

/**
 * Caramelo Price — renders a price with optional original (strikethrough),
 * discount badge, and the "Clube"/subscription promo treatment.
 */
export function Price({
  value,
  original,
  size = "md",
  currency = "R$",
  club = false,
  className,
  style,
  ...rest
}) {
  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : n;
  const fs = { sm: 16, md: 22, lg: 32 }[size] || 22;
  const accent = club ? "var(--c-brand)" : "var(--c-text)";
  return (
    <span className={className} style={{ display: "inline-flex", flexDirection: "column", gap: 2, fontFamily: "var(--font-plain)", ...style }} {...rest}>
      {original != null && (
        <span style={{ fontSize: fs * 0.6, color: "var(--c-text-muted)", textDecoration: "line-through", lineHeight: 1 }}>
          {currency} {fmt(original)}
        </span>
      )}
      <span style={{ display: "inline-flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: fs * 0.62, fontWeight: "var(--fw-bold)", color: accent }}>{currency}</span>
        <span style={{ fontSize: fs, fontWeight: "var(--fw-bold)", color: accent, lineHeight: 1 }}>{fmt(value)}</span>
      </span>
      {club && (
        <span style={{ fontSize: 11, fontWeight: "var(--fw-bold)", color: "var(--c-brand)", letterSpacing: 0.3 }}>
          no Clube Petlove
        </span>
      )}
    </span>
  );
}

export default Price;
