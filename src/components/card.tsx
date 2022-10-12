import * as React from "react"

type CardProps = {
    background?: string,
    children: React.ReactNode
};
  
const defaultClass = 'h-fit w-fit p-3 rounded-lg border border-gray-200 shadow-md';

const Card = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const {children, className, ...restOfProps} = props;
    return (
      <div {...restOfProps} className={`${defaultClass} ${className ?? ""}`}>
        {children}
      </div>
    )
  }
  
  export default Card