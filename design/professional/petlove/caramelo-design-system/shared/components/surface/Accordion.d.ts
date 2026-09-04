import React from "react";
export interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
}
export interface AccordionProps {
  items: AccordionItem[];
  /** Allow more than one open at a time. */
  allowMultiple?: boolean;
  /** Indices open initially. */
  defaultOpen?: number[];
  className?: string;
  style?: React.CSSProperties;
}
export function Accordion(props: AccordionProps): JSX.Element;
export default Accordion;
