import React from "react";
export interface TextareaProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** @default 4 */
  rows?: number;
  helper?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
export function Textarea(props: TextareaProps): JSX.Element;
export default Textarea;
