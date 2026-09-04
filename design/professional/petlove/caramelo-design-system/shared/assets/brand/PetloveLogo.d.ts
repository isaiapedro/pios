import * as React from 'react';
export interface PetloveLogoProps {
  className?: string;
  style?: React.CSSProperties;
  size?: "lg" | "sm" | "md";
  type?: "inverse" | "default";
}
export declare const PetloveLogo: React.FC<PetloveLogoProps>;
export default PetloveLogo;
