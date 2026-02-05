import type { JSX } from "react";

export function PageHeader({
  children: text
}: {
  children: string;
}): JSX.Element {
  return (
    <h1 className="mt-5 text-5xl font-bold text-primary-700 dark:text-primary-400">
      {text}
    </h1>
  );
}
