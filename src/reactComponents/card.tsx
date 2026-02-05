import { twMerge } from "tailwind-merge";

const defaultClass =
  "h-fit w-fit rounded-2xl bg-white/80 backdrop-blur-md p-4 text-body-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-body-200/50";
const darkDefaultClass =
  "dark:bg-body-800/80 dark:text-body-100 dark:border-body-700/50 dark:shadow-body-950/50";

const Card = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const { children, className, ...restOfProps } = props;
  return (
    <div
      {...restOfProps}
      className={twMerge(defaultClass, darkDefaultClass, className)}
    >
      {children}
    </div>
  );
};

export default Card;
