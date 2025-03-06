import { twMerge } from "tailwind-merge";

const defaultClass =
  "h-fit w-fit rounded-lg bg-body-100 p-3 text-body-800 shadow-md shadow-body-500";
const darkDefaultClass =
  "dark:bg-body-500 dark:text-body-100 dark:shadow-body-950";

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
