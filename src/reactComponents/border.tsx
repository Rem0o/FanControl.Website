import { twMerge } from "tailwind-merge";

const defaultClass = "rounded-2xl border border-body-300 p-4";

const Border = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const { children, className, ...restOfProps } = props;
  return (
    <div {...restOfProps} className={twMerge(defaultClass, className)}>
      {children}
    </div>
  );
};

export default Border;