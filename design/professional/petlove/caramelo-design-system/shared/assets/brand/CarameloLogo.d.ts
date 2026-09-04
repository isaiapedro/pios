import * as React from 'react';
export interface CarameloLogoProps {
  className?: string;
  style?: React.CSSProperties;
  blue?: "default" | "dark" | "blue" | "white";
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}
export declare const CarameloLogo: React.FC<CarameloLogoProps>;
export default CarameloLogo;
