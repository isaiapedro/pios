import React from "react";
/**
 * Storefront product tile composing Price, Badge, Rating, Button.
 * @startingPoint section="Commerce" subtitle="Storefront product card" viewport="700x420"
 */
export interface ProductCardProps {
  image?: string;
  brand?: string;
  title: string;
  price: number | string;
  originalPrice?: number | string;
  /** Discount percent shown as a heart badge. */
  discount?: number;
  rating?: number;
  reviews?: number;
  /** Use the Clube Petlove price treatment. */
  club?: boolean;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  onAdd?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
export function ProductCard(props: ProductCardProps): JSX.Element;
export default ProductCard;
