import * as React from "react"

const defaultClass = 'h-fit w-fit p-3 rounded-lg shadow-md shadow-slate-400';

const Card = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const {children, className, ...restOfProps} = props;
    return (
      <div {...restOfProps} className={`${defaultClass} ${className ?? ""}`}>
        {children}
      </div>
    )
  }
  
  export default Card