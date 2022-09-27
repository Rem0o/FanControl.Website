import * as React from "react";
import { useState } from "react";
import Card from "../card";
import Toggle from "../toggle";
import { FanCurve } from "./fanCurve";

const icon = (
  <svg className="w-12 h-12" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z"
    />
  </svg>
);


const ControlCard = ({name, availableFanCurves} : {name: string, availableFanCurves: FanCurve[]}) => {
  const enabledState = useState(false);
  const [enabled, _] = enabledState;
  const background = "bg-slate-400";
  const [selectedFanCurve, setSelectedFanCurve] = useState("");

  return (
    <Card background={background}>
      <div className="flex flex-col text-white w-52">
        <div className="flex flex-row justify-center items-center">
          {icon}
          <div className="border-b-2 ml-4 border-white w-full ">{name}</div>
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <Toggle checkedState={enabledState} text=""></Toggle>
          <div className="w-full">
            <label className="mb-2 text-sm font-medium">
              Select a fan curve
            </label>
            <select value={selectedFanCurve} onChange={e => setSelectedFanCurve(availableFanCurves[e.target.options.selectedIndex - 1].name) }  disabled={!enabled} className="w-full bg-transparent border-white border-spacing-1 border rounded-md focus:bg-slate-500">
            <option disabled selected={selectedFanCurve == ""}>{""}</option>
                {availableFanCurves.map((fc, i) => <option>{fc.name}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <div>{enabled ? availableFanCurves.find(x => x.name == selectedFanCurve)?.getValue() ?? "-" : "-"} %</div>
        </div>
      </div>
    </Card>
  );
};

export default ControlCard;
