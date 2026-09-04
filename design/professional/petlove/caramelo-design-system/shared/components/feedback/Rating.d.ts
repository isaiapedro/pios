import React from "react";
export interface RatingProps {
  /** 0..max */
  value?: number;
  /** @default 5 */
  max?: number;
  /** Star px size. @default 16 */
  size?: number;
  /** Review count shown in parentheses. */
  count?: number;
  /** Show numeric value. */
  showValue?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export function Rating(props: RatingProps): JSX.Element;
export default Rating;
