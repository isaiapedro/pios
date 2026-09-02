import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo Accordion — a list of expandable items. */
export function Accordion({ items = [], allowMultiple = false, defaultOpen = [], className, style, ...rest }) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = (i) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };
  return (
    <div className={className} style={{
      border: "1px solid var(--c-border)", borderRadius: "var(--radius-md)",
      overflow: "hidden", background: "var(--c-bg)", fontFamily: "var(--font-plain)", ...style,
    }} {...rest}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} style={{ borderTop: i ? "1px solid var(--c-border)" : "none" }}>
            <button type="button" onClick={() => toggle(i)} aria-expanded={isOpen} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              width: "100%", padding: "16px 18px", border: "none", background: "transparent",
              cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: "var(--fw-semibold)",
              color: "var(--c-text)", textAlign: "left",
            }}>
              {it.title}
              <span style={{ color: "var(--c-brand)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s ease", display: "inline-flex", flexShrink: 0 }}>
                <Icon name="chevron-down" size={22} />
              </span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 18px 18px", fontSize: 14, color: "var(--c-text-secondary)", lineHeight: "var(--lh-relaxed)" }}>
                {it.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
