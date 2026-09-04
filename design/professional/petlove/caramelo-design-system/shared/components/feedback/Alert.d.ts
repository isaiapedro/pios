import React from "react";
import type { IconName } from "../icons/Icon";
/**
 * Inline contextual message banner.
 * @startingPoint section="Feedback" subtitle="Inline alert — 5 intents" viewport="700x130"
 */
export interface AlertProps {
  /** @default "info" */
  color?: "info" | "success" | "warning" | "danger" | "brand";
  title?: string;
  children?: React.ReactNode;
  /** Override the default intent icon. */
  icon?: IconName;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
export function Alert(props: AlertProps): JSX.Element;
export default Alert;
