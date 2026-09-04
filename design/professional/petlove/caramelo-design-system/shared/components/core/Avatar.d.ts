import React from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Fallback initials when no src. */
  initials?: string;
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Brand status ring. */
  ring?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export function Avatar(props: AvatarProps): JSX.Element;
export default Avatar;
