import { TrackedAnchor } from "./links";
import { twMerge } from "tailwind-merge";

export function FooterButton({
  href,
  text,
  iconSvgPath,
  viewBox,
  className
}: {
  href: string;
  text: string;
  iconSvgPath: string;
  viewBox?: string;
  className?: string;
}) {
  return (
    <TrackedAnchor href={href}>
      <button
        className={twMerge(
          "flex items-center justify-center rounded-xl border-2 border-body-700 dark:border-body-300 px-4 py-2 text-sm font-medium hover:bg-primary-600 hover:border-primary-600 hover:text-white dark:hover:bg-primary-500 dark:hover:border-primary-500 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md cursor-pointer",
          className
        )}
      >
        <svg className="h-5 w-5" viewBox={viewBox ?? "0 0 24 24"}>
          <path fill="currentColor" d={iconSvgPath} />
        </svg>
        <span className="ml-2">{text}</span>
      </button>
    </TrackedAnchor>
  );
}
