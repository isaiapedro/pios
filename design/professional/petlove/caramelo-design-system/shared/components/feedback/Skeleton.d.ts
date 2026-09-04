import React from "react";
export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  /** Render a circle of diameter = height. */
  circle?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export function Skeleton(props: SkeletonProps): JSX.Element;
export default Skeleton;
