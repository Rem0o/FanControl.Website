import * as React from "react"

type CardProps = {
    background?: string,
    children: React.ReactNode
};
  
const defaultClass = 'h-fit w-fit p-3 rounded-lg border border-gray-200 shadow-md';

const Card = ({background, children}: CardProps) => {
    return (
      <div className={`${defaultClass} ${background ?? "bg-white"}`}>
        {children}
      </div>
    )
  }
  
  export default Card