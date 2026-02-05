import { twMerge } from "tailwind-merge";
import Border from "./border";

interface FeatureCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable feature card with glass effect and hover animations
 * Used for the main feature sections on the homepage
 */
export const FeatureCard = ({ children, className }: FeatureCardProps) => {
  return (
    <Border 
      className={twMerge(
        "glass max-w-sm backdrop-blur-md",
        "transform transition-all duration-300",
        "hover:scale-105 hover:shadow-glow",
        className
      )}
    >
      {children}
    </Border>
  );
};
