import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo Stepper — horizontal numbered progress through steps. */
export function Stepper({ steps = [], current = 0, className, style, ...rest }) {
  return (
    <div className={className} style={{ display: "flex", alignItems: "flex-start", fontFamily: "var(--font-plain)", ...style }} {...rest}>
      {steps.map((label, i) => {
        const done = i < current, active = i === current;
        const circleBg = done ? "var(--c-brand)" : active ? "var(--c-bg)" : "var(--c-bg)";
        const circleBd = done || active ? "var(--c-brand)" : "var(--c-border-strong)";
        const fg = done ? "var(--c-on-brand)" : active ? "var(--c-brand)" : "var(--c-text-muted)";
        return (
          <React.Fragment key={i}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 64 }}>
              <span style={{
                width: 32, height: 32, borderRadius: "var(--radius-pill)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: circleBg, border: `2px solid ${circleBd}`, color: fg,
                fontSize: 14, fontWeight: "var(--fw-bold)",
              }}>
                {done ? <Icon name="check" size={18} /> : i + 1}
              </span>
              <span style={{ fontSize: 12, fontWeight: active ? "var(--fw-bold)" : "var(--fw-medium)", color: active ? "var(--c-text)" : "var(--c-text-muted)", textAlign: "center", maxWidth: 88 }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <span style={{ flex: 1, height: 2, background: i < current ? "var(--c-brand)" : "var(--c-border)", marginTop: 15, borderRadius: 1 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Stepper;
