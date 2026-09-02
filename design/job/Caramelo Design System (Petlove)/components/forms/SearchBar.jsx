import React from "react";
import { Icon } from "../icons/Icon.jsx";

/** Caramelo SearchBar — the pill search field used across Petlove shops. */
export function SearchBar({ value, defaultValue, placeholder = "Buscar produtos, marcas e mais", onChange, onSubmit, size = "md", className, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const h = { md: 48, lg: 56 }[size] || 48;
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(); }}
      className={className}
      style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        height: h, padding: "0 8px 0 18px",
        background: "var(--c-bg)", borderRadius: "var(--radius-pill)",
        border: `2px solid ${focus ? "var(--c-brand)" : "var(--c-border-strong)"}`,
        boxShadow: focus ? "var(--shadow-focus)" : "none",
        transition: "border-color .15s ease, box-shadow .15s ease",
        fontFamily: "var(--font-plain)", ...style,
      }}
      {...rest}
    >
      <Icon name="search" size={22} color="var(--c-text-muted)" />
      <input
        type="search" value={value} defaultValue={defaultValue} placeholder={placeholder} onChange={onChange}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "inherit", fontSize: 16, color: "var(--c-text)", minWidth: 0 }}
      />
      <button type="submit" aria-label="Buscar" style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: h - 12, height: h - 12, border: "none", borderRadius: "var(--radius-pill)",
        background: "var(--c-brand)", color: "var(--c-on-brand)", cursor: "pointer", flexShrink: 0,
      }}>
        <Icon name="search" size={20} />
      </button>
    </form>
  );
}

export default SearchBar;
