import React from "react";
import Card from "../card";
import { FanCurve } from "./fanCurve";

const icon = (path: string) => (
  <svg className="w-12 h-12" viewBox="0 0 24 24">
    <path fill="currentColor" d={path} />
  </svg>
);

type Props = {
  iconPath: string;
  fanCurve: FanCurve;
  controlValueSuffix?: string;
  children?: React.ReactNode;
};

export default function FanCurveCard({
  iconPath,
  fanCurve,
  controlValueSuffix,
  children,
}: Props) {

  const background = "bg-blue-500";
  const value = fanCurve.getValue();
  const isValid = (number:number) => number >= 0 && number <= 100;

  return (
    <Card background={background}>
      <div className="flex flex-col text-white w-52">
        <div className="flex flex-row justify-center items-center">
          {icon(iconPath)}
          <div className="border-b-2 ml-4 border-white w-full ">
            {fanCurve.name}
          </div>
        </div>
        <div>{children}</div>
        <div className="mt-1 flex flex-row justify-between">
          <div>
            <span>{isValid(value) ? value.toFixed(1) : "-"} %</span>{" "}
            <span>{controlValueSuffix}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
