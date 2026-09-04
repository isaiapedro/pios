import React from "react";
import type { IconName } from "../icons/Icon";

/**
 * Circular icon-only action button.
 * @startingPoint section="Core" subtitle="Icon-only circular action" viewport="700x140"
 */
export interface IconButtonProps {
  name: IconName;
  /** @default "default" */
  type?: "default" | "danger" | "neutral";
  /** @default "primary" */
  weight?: "primary" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function IconButton(props: IconButtonProps): JSX.Element;
export default IconButton;
