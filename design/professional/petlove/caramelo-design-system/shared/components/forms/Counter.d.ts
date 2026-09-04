import React from "react";
/**
 * Quantity stepper for product/cart rows.
 * @startingPoint section="Commerce" subtitle="Quantity stepper" viewport="700x120"
 */
export interface CounterProps {
  value?: number;
  /** @default 1 */
  defaultValue?: number;
  /** @default 0 */
  min?: number;
  /** @default 99 */
  max?: number;
  /** @default "md" */
  size?: "sm" | "md";
  onChange?: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
}
export function Counter(props: CounterProps): JSX.Element;
export default Counter;
