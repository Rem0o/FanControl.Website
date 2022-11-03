import * as React from "react";
import Card from "../card";
import { TemperatureSource } from "./temperatureSource";

const icon = (
  <svg className="h-12 w-12" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z"
    />
  </svg>
);

const TemperatureCard = (temperatureSource: TemperatureSource) => {
  const background = "bg-slate-400";

  return (
    <Card className={background}>
      <div className="flex w-52 flex-col text-white">
        <div className="flex flex-row items-center justify-center">
          {icon}
          <div className="ml-4 w-full border-b-2 border-white ">
            {temperatureSource.name}
          </div>
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <div>{temperatureSource.value} deg C</div>
        </div>
      </div>
    </Card>
  );
};

export default TemperatureCard;
