import React from "react";
export interface DividerProps {
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
}
export function Divider(props: DividerProps): JSX.Element;
export default Divider;
