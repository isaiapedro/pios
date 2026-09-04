import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo Pagination — numbered pages with prev/next. */
export function Pagination({ page = 1, total = 1, onChange, className, style, ...rest }) {
  const go = (p) => { if (p >= 1 && p <= total && p !== page) onChange && onChange(p); };
  const pages = React.useMemo(() => {
    const out = [];
    const add = (p) => out.push(p);
    if (total <= 7) { for (let i = 1; i <= total; i++) add(i); return out; }
    add(1);
    const start = Math.max(2, page - 1), end = Math.min(total - 1, page + 1);
    if (start > 2) add("…");
    for (let i = start; i <= end; i++) add(i);
    if (end < total - 1) add("…");
    add(total);
    return out;
  }, [page, total]);
  const cell = (content, opts = {}) => (
    <button type="button" disabled={opts.disabled} onClick={opts.onClick} aria-current={opts.active ? "page" : undefined} style={{
      minWidth: 40, height: 40, padding: "0 8px", border: `1.5px solid ${opts.active ? "var(--c-brand)" : "transparent"}`,
      borderRadius: "var(--radius-pill)", cursor: opts.disabled ? "not-allowed" : "pointer",
      background: opts.active ? "var(--c-brand-faint)" : "transparent",
      color: opts.disabled ? "var(--c-text-disabled)" : opts.active ? "var(--c-brand-strong)" : "var(--c-text-secondary)",
      fontFamily: "var(--font-plain)", fontSize: 15, fontWeight: opts.active ? "var(--fw-bold)" : "var(--fw-medium)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
    }}>{content}</button>
  );
  return (
    <div className={className} style={{ display: "inline-flex", alignItems: "center", gap: 4, ...style }} {...rest}>
      {cell(<Icon name="chevron-left" size={20} />, { disabled: page <= 1, onClick: () => go(page - 1) })}
      {pages.map((p, i) => p === "…"
        ? <span key={"e" + i} style={{ minWidth: 28, textAlign: "center", color: "var(--c-text-muted)" }}>…</span>
        : <React.Fragment key={p}>{cell(p, { active: p === page, onClick: () => go(p) })}</React.Fragment>)}
      {cell(<Icon name="chevron-right" size={20} />, { disabled: page >= total, onClick: () => go(page + 1) })}
    </div>
  );
}

export default Pagination;
