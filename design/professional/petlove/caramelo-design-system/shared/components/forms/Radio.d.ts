import React from "react";
export interface RadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: React.ReactNode;
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string | boolean) => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
export function Radio(props: RadioProps): JSX.Element;
export default Radio;
