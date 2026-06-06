import Card from "./card";
import { Icon } from "./icon";
import type { SvgIcon } from "../common/icons";
import { useCursorGlow } from "../common/hooks";
import { twMerge } from "tailwind-merge";

interface IconButtonProps {
  className: string;
  text: string;
  icon: SvgIcon;
  onClick?: () => void;
}

/**
 * Button component with an icon and text label
 * Features hover scale animation and icon rotation
 */
export const IconButton = ({
  className,
  text,
  icon,
  onClick
}: IconButtonProps) => {
  const glowEvents = useCursorGlow<HTMLDivElement>();

  return (
    <button 
      onClick={onClick}
      className="group transform transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
    >
      <Card {...glowEvents} className={twMerge("cursor-glow-button", className)}>
        <div className="flex w-48 items-center justify-center gap-3">
          <Icon icon={icon} />
          <span className="m-auto text-base font-semibold">{text}</span>
        </div>
      </Card>
    </button>
  );
};
