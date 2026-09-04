import React from "react";
import type { IconName } from "../icons/Icon";
/**
 * Selectable filter/choice pill.
 * @startingPoint section="Navigation" subtitle="Filter chips" viewport="700x110"
 */
export interface ChipProps {
  children?: React.ReactNode;
  selected?: boolean;
  icon?: IconName;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
export function Chip(props: ChipProps): JSX.Element;
export default Chip;
