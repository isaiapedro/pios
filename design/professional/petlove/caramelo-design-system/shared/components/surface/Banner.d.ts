import React from "react";
/**
 * Promotional banner with title, subtitle, CTA and optional artwork.
 * @startingPoint section="Surface" subtitle="Promotional banner" viewport="700x200"
 */
export interface BannerProps {
  title?: string;
  subtitle?: string;
  /** CTA label. */
  cta?: string;
  onCta?: () => void;
  /** @default "brand" */
  tone?: "brand" | "cream" | "heart";
  image?: string;
  className?: string;
  style?: React.CSSProperties;
}
export function Banner(props: BannerProps): JSX.Element;
export default Banner;
