import React from "react";
import type { IconName } from "../icons/Icon";
export interface BottomNavItem { value: string; label: string; icon: IconName; }
/**
 * Mobile bottom tab bar.
 * @startingPoint section="Navigation" subtitle="Mobile bottom nav" viewport="390x80"
 */
export interface BottomNavProps {
  items: BottomNavItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
export function BottomNav(props: BottomNavProps): JSX.Element;
export default BottomNav;
