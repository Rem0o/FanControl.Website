export function PageHeader({ text }: { text: string; }): JSX.Element {
  return <h1 className="text-5xl font-light mt-5">{text}</h1>;
}
