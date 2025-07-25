import { twMerge } from "tailwind-merge";
import type { SvgIcon } from "../common/icons";

// type for these function parameters to wrap them in a component
type IconProps = {
  icon: SvgIcon;
  className?: string;
};

const renderIcon = (props: IconProps) => {
  const viewBox = getViewBox(props.icon);
  const path = getPath(props.icon);
  return (
    <svg className={props.className} viewBox={viewBox}>
      <path fill="currentColor" d={path} />
    </svg>
  );
};

const BigIcon = (props: IconProps) =>
  renderIcon({ icon: props.icon, className: twMerge("h-12 w-12", props.className)});

const Icon = (props: IconProps) =>
  renderIcon({ icon: props.icon, className: twMerge("h-8 w-8", props.className)});

const SmallIcon = (props: IconProps) =>
  renderIcon({ icon: props.icon, className: twMerge("h-5 w-5", props.className)});

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
