import { TrackedAnchor } from "./links";

export function FooterButton({
  href,
  text,
  iconSvgPath,
  viewBox
}: {
  href: string;
  text: string;
  iconSvgPath: string;
  viewBox?: string;
}) {
  return (
    <TrackedAnchor href={href}>
      <button className="flex rounded-2xl border border-black px-2 py-1 pr-3 text-sm hover:border-primary-600 hover:text-primary-600">
        <svg className="h-4 w-4" viewBox={viewBox ?? "0 0 24 24"}>
          <path fill="currentColor" d={iconSvgPath} />
        </svg>
        <span className="ml-1 self-center">{text}</span>
      </button>
    </TrackedAnchor>
  );
}
