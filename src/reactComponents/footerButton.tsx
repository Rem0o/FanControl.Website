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
          "flex items-center justify-center rounded-2xl border dark:border-neutral-300 border-neutral-950 px-2 py-1 pr-3 text-sm hover:border-primary-600 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400",  
          className
        )}
      >
        <svg className="h-4 w-4" viewBox={viewBox ?? "0 0 24 24"}>
          <path fill="currentColor" d={iconSvgPath} />
        </svg>
        <span className="ml-2">{text}</span>
      </button>
    </TrackedAnchor>
  );
}
