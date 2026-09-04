import React from "react";
/**
 * Horizontal numbered step progress (checkout, onboarding).
 * @startingPoint section="Navigation" subtitle="Step progress" viewport="700x120"
 */
export interface StepperProps {
  /** Step labels. */
  steps: string[];
  /** Index of the active step (0-based). Earlier steps render as done. */
  current?: number;
  className?: string;
  style?: React.CSSProperties;
}
export function Stepper(props: StepperProps): JSX.Element;
export default Stepper;
