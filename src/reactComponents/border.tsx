import { twMerge } from "tailwind-merge";

const defaultClass = "rounded-2xl border-2 border-body-300 dark:border-body-700/60 p-6 bg-white/50 dark:bg-body-800/50 backdrop-blur-sm transition-all duration-300";

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
