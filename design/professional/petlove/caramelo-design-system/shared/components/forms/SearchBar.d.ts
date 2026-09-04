import React from "react";
/**
 * Pill search field with submit button — the Petlove storefront search.
 * @startingPoint section="Forms" subtitle="Storefront search bar" viewport="700x120"
 */
export interface SearchBarProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  /** @default "md" */
  size?: "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}
export function SearchBar(props: SearchBarProps): JSX.Element;
export default SearchBar;
