import React from "react";
import { ICONS } from "./iconRegistry.js";

export type IconName =
  | "arrow-right" | "cart" | "cat" | "check" | "chevron-down" | "chevron-left"
  | "chevron-right" | "close" | "close-circle" | "danger" | "dog" | "gift"
  | "heart" | "home" | "info" | "minus-circle" | "plus" | "search" | "star"
  | "success" | "warning";

export interface IconProps {
  /** Glyph name from the Caramelo icon set. */
  name: IconName;
  /** Pixel size (square). @default 24 */
  size?: number;
  /** Overrides currentColor. */
  color?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon(props: IconProps): JSX.Element;
export const ICON_NAMES: IconName[];
export default Icon;
