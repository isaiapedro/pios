import React from "react";
import type { IconName } from "../icons/Icon";

export interface TagProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  color?: "neutral" | "brand" | "success" | "danger";
  icon?: IconName;
  /** Show a remove (×) button and handle its click. */
  onRemove?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
export function Tag(props: TagProps): JSX.Element;
export default Tag;
