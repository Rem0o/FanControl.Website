import * as React from "react";
import Card from "../card";
import { TemperatureSource } from "./temperatureSource";

const icon = (
  <svg className="w-12 h-12" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z"
    />
  </svg>
);

const TemperatureCard = (temperatureSource: TemperatureSource) => {

  const background = "bg-slate-400";

  return (
    <Card background={background}>
      <div className="flex flex-col text-white w-52">
        <div className="flex flex-row justify-center items-center">
          {icon}
          <div className="border-b-2 ml-4 border-white w-full ">{temperatureSource.name}</div>
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <div>{temperatureSource.value} deg C</div>
        </div>
      </div>
    </Card>
  );
};

export default TemperatureCard;
