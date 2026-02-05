import { twMerge } from "tailwind-merge";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  className?: string;
  variant?: "primary" | "accent";
}

/**
 * Reusable gradient button with hover animations
 * Variant: primary (blue) or accent (yellow)
 */
export const GradientButton = ({ 
  children, 
  onClick, 
  onMouseEnter, 
  className,
  variant = "primary" 
}: GradientButtonProps) => {
  const baseClasses = "w-full transform rounded-xl p-3 text-center font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-glow cursor-pointer";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800",
    accent: "bg-gradient-to-r from-accent to-yellow-500 text-body-900 hover:from-yellow-400 hover:to-accent"
  };

  return (
    <button
      className={twMerge(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </button>
  );
};
