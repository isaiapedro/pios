import React from "react";

export type ButtonType = "default" | "accent" | "danger" | "inverted";
export type ButtonWeight = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Caramelo pill button.
 *
 * @startingPoint section="Core" subtitle="Pill action button — type × weight × size" viewport="700x180"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Color intent. @default "default" (purple) */
  type?: ButtonType;
  /** Visual hierarchy. @default "primary" */
  weight?: ButtonWeight;
  /** @default "md" */
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
export default Button;
