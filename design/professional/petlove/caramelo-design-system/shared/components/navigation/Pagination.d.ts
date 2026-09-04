import React from "react";
export interface PaginationProps {
  /** Current page (1-based). */
  page?: number;
  /** Total page count. */
  total?: number;
  onChange?: (page: number) => void;
  className?: string;
  style?: React.CSSProperties;
}
export function Pagination(props: PaginationProps): JSX.Element;
export default Pagination;
