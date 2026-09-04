import React from "react";
export interface TabItem { value: string; label: React.ReactNode; }
/**
 * Underline tab bar.
 * @startingPoint section="Navigation" subtitle="Underline tabs" viewport="700x120"
 */
export interface TabsProps {
  /** Strings or {value,label}. */
  tabs: (string | TabItem)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
export function Tabs(props: TabsProps): JSX.Element;
export default Tabs;
