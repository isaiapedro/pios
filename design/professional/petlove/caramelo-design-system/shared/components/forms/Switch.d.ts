import React from "react";
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: React.ReactNode;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
export function Switch(props: SwitchProps): JSX.Element;
export default Switch;
