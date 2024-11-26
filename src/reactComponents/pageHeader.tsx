export function PageHeader({
  children: text
}: {
  children: string;
}): JSX.Element {
  return <h1 className="mt-5 text-5xl font-light">{text}</h1>;
}
