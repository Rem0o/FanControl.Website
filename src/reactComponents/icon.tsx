import { twMerge } from "tailwind-merge";
import type { SvgIcon } from "../common/icons";

const renderIcon = (icon: SvgIcon, className: string) => {
  const viewBox = getViewBox(icon);
  const path = getPath(icon);
  return (
    <svg className={className} viewBox={viewBox}>
      <path fill="currentColor" d={path} />
    </svg>
  );
};

const BigIcon = (icon: SvgIcon, className?: string) =>
  renderIcon(icon, twMerge("h-12 w-12", className));

const Icon = (icon: SvgIcon, className?: string) =>
  renderIcon(icon, twMerge("h-8 w-8", className));

const SmallIcon = (icon: SvgIcon, className?: string) =>
  renderIcon(icon, twMerge("h-5 w-5", className));

const getViewBox = (icon: SvgIcon): string => {
  if (typeof icon === "string") {
    return "0 0 24 24";
  }

  return icon.viewbox;
};

const getPath = (icon: SvgIcon): string => {
  if (typeof icon === "string") {
    return icon;
  }

  return icon.path;
};

export { BigIcon, Icon, SmallIcon };
