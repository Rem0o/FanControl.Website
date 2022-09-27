import React from "react";
import Card from "../card";
import { FanCurve } from "./fanCurve";

const icon = (path:string) => (
    <svg className="w-12 h-12" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d={path}
      />
    </svg>
  );
  
// 

export default function FanCurveCard(iconPath: string, fanCurve: FanCurve) {
  const background = "bg-slate-400";

  return (
    <Card background={background}>
      <div className="flex flex-col text-white w-52">
        <div className="flex flex-row justify-center items-center">
          {icon(iconPath)}
          <div className="border-b-2 ml-4 border-white w-full ">
            {fanCurve.name}
          </div>
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <div>{fanCurve.getValue()} %</div>
        </div>
      </div>
    </Card>
  );
}
