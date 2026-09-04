import React from "react";
import type { IconName } from "../icons/Icon";
/**
 * Centered empty/zero-result state.
 * @startingPoint section="Feedback" subtitle="Empty / zero-result state" viewport="700x320"
 */
export interface EmptyStateProps {
  /** @default "search" */
  icon?: IconName;
  title?: string;
  description?: string;
  /** Action node (e.g. a Button). */
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export function EmptyState(props: EmptyStateProps): JSX.Element;
export default EmptyState;
