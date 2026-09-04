import React from "react";
import type { IconName } from "../icons/Icon";
export interface SnackbarProps {
  message: React.ReactNode;
  /** Action label, e.g. "Desfazer". */
  action?: string;
  onAction?: () => void;
  /** @default "neutral" */
  color?: "neutral" | "success" | "danger";
  icon?: IconName;
  className?: string;
  style?: React.CSSProperties;
}
export function Snackbar(props: SnackbarProps): JSX.Element;
export default Snackbar;
