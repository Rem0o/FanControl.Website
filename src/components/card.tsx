import * as React from "react";
import { twMerge } from "tailwind-merge";

const defaultClass = "h-fit w-fit p-3 rounded-lg shadow-md shadow-body-500";

const Card = (
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

export default Card;
