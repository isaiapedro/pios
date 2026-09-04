import React from "react";
export interface SegmentOption { value: string; label: React.ReactNode; }
export interface SegmentedButtonProps {
  options: (string | SegmentOption)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** @default "md" */
  size?: "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
}
export function SegmentedButton(props: SegmentedButtonProps): JSX.Element;
export default SegmentedButton;
