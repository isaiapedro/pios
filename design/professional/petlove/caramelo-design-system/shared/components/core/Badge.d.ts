import React from "react";

export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "brand" */
  color?: "brand" | "neutral" | "success" | "danger" | "warning" | "info" | "heart";
  /** @default "soft" */
  variant?: "soft" | "solid";
  /** @default "md" */
  size?: "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): JSX.Element;
export default Badge;
