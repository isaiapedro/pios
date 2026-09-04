import React from "react";
import { Price } from "../core/Price.jsx";
import { Badge } from "../core/Badge.jsx";
import { Button } from "../core/Button.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { Rating } from "../feedback/Rating.jsx";

/**
 * Caramelo ProductCard — the storefront product tile. Image with discount
 * badge + favorite, brand, title, rating, price, and add-to-cart action.
 */
export function ProductCard({
  image,
  brand,
  title,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  club = false,
  favorite = false,
  onToggleFavorite,
  onAdd,
  className,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        display: "flex", flexDirection: "column", width: 240,
        background: "var(--c-bg)", border: "1px solid var(--c-border)",
        borderRadius: "var(--radius-lg)", overflow: "hidden",
        boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-xs)",
        transform: hover ? "translateY(-2px)" : "none",
        transition: "box-shadow .18s ease, transform .18s ease",
        fontFamily: "var(--font-plain)", ...style,
      }}
      {...rest}
    >
      <div style={{ position: "relative", aspectRatio: "1 / 1", background: "var(--c-surface-cream)" }}>
        {image && <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
        {discount && (
          <span style={{ position: "absolute", top: 12, left: 12 }}>
            <Badge color="heart" variant="solid">-{discount}%</Badge>
          </span>
        )}
        <span style={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton name="heart" type={favorite ? "danger" : "neutral"} weight="ghost" size="sm" ariaLabel="Favoritar" onClick={onToggleFavorite}
            style={favorite ? { color: "var(--c-heart)" } : { background: "var(--c-bg)" }} />
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 16 }}>
        {brand && <span style={{ fontSize: 12, fontWeight: "var(--fw-bold)", color: "var(--c-text-muted)", textTransform: "uppercase", letterSpacing: 0.4 }}>{brand}</span>}
        <span style={{ fontSize: 14, color: "var(--c-text)", lineHeight: "var(--lh-snug)", minHeight: 38, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</span>
        {rating != null && <Rating value={rating} count={reviews} size={14} />}
        <Price value={price} original={originalPrice} club={club} size="md" />
        <Button type="default" weight="primary" size="sm" fullWidth onClick={onAdd}>Adicionar</Button>
      </div>
    </div>
  );
}

export default ProductCard;
