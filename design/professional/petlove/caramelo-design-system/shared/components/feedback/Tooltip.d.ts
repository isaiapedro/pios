import React from "react";
export interface TooltipProps {
  label: React.ReactNode;
  /** @default "top" */
  placement?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export function Tooltip(props: TooltipProps): JSX.Element;
export default Tooltip;
