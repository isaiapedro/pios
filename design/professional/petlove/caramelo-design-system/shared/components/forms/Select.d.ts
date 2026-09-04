import React from "react";
export interface SelectOption { value: string; label: string; }
export interface SelectProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  /** Array of strings or {value,label} objects. */
  options?: (string | SelectOption)[];
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
export function Select(props: SelectProps): JSX.Element;
export default Select;
