import React from "react";

/**
 * Labelled text field with helper/error states.
 * @startingPoint section="Forms" subtitle="Text field with label, helper, error" viewport="700x150"
 */
export interface InputProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** @default "text" */
  type?: string;
  helper?: string;
  /** Error message — turns the field red. */
  error?: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
export default Input;
