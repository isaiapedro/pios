import React from "react";
export interface ProgressIndicatorProps {
  /** 0..100 (ignored when indeterminate). */
  value?: number;
  /** @default "linear" */
  variant?: "linear" | "circular";
  /** Circular diameter px. @default 40 */
  size?: number;
  /** Stroke/bar thickness px. @default 4 */
  thickness?: number;
  indeterminate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export function ProgressIndicator(props: ProgressIndicatorProps): JSX.Element;
export default ProgressIndicator;
