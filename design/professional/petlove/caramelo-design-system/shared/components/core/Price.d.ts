import React from "react";

/**
 * Price display with strikethrough original and Clube Petlove promo treatment.
 * @startingPoint section="Commerce" subtitle="Price with discount + Clube promo" viewport="700x140"
 */
export interface PriceProps {
  /** Current price (number → pt-BR formatted, or pre-formatted string). */
  value: number | string;
  /** Original price shown struck through. */
  original?: number | string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** @default "R$" */
  currency?: string;
  /** Use the purple Clube Petlove subscription treatment. */
  club?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export function Price(props: PriceProps): JSX.Element;
export default Price;
