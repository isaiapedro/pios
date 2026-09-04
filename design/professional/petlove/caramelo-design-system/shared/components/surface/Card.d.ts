import React from "react";
/**
 * Base surface container — rounded, warm border, soft shadow.
 * @startingPoint section="Surface" subtitle="Base content card" viewport="700x200"
 */
export interface CardProps {
  children?: React.ReactNode;
  /** Inner padding in px. @default 20 */
  padding?: number;
  /** Adds hover lift + shadow. */
  interactive?: boolean;
  /** Always show the medium shadow. */
  elevated?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
export default Card;
