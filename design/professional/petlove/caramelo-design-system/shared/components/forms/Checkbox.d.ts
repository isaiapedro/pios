import React from "react";
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: React.ReactNode;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
export default Checkbox;
