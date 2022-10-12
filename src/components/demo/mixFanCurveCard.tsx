import React, { useState } from "react";
import icons from "../../contents/icons";
import Select from "../select";
import { FanCurve } from "./fanCurve";
import FanCurveCard from "./fanCurveCard";

type MixFunction = {
  name: string;
  invoke: (fanCurves: FanCurve[]) => number;
};

const functions: MixFunction[] = [
  {
    name: "Max",
    invoke: (fanCurves) =>
      fanCurves.map((x) => x.getValue()).reduce((a, b) => (a > b ? a : b), -1),
  },
  {
    name: "Min",
    invoke: (fanCurves) =>
      fanCurves.map((x) => x.getValue()).reduce((a, b) => (a < b ? a : b), 101),
  },
  {
    name: "Average",
    invoke: (fanCurves) =>
      fanCurves.map((f) => f.getValue()).reduce((a, b) => a + b, 0) /
      fanCurves.length,
  },
];

export default function MixFanCurveCard({
  name,
  fanCurves,
  selectedFanCurvesDefault,
}: {
  name: string;
  fanCurves: FanCurve[];
  selectedFanCurvesDefault?: FanCurve[];
}) {
  const [selectedFanCurves, setSelectedFanCurve] = useState(
    selectedFanCurvesDefault ?? fanCurves
  );
  const [selectedFunction, setSelectedFunction] = useState(functions[0]);

  const addFromIndex = (index: number) => {
    let fc = fanCurves[index - 1];
    if (!selectedFanCurves.map((f) => f.name).includes(fc.name)) {
      setSelectedFanCurve([...selectedFanCurves, fc]);
    }
  };

  const fanCurve: FanCurve = {
    name: name,
    getValue: () => selectedFunction.invoke(selectedFanCurves),
  };

  const suffix =
    selectedFanCurves.length > 0
      ? selectedFanCurves.find((x) => x.getValue() == fanCurve.getValue())
          ?.name ?? "Average"
      : selectedFunction.name;

  return (
    <FanCurveCard
      iconPath={icons.svgPaths.mix}
      fanCurve={fanCurve}
      controlValueSuffix={` (${suffix})`}
    >
      <Select
        onChange={(e) => setSelectedFunction(functions[e.target.selectedIndex])}
        value={selectedFunction.name}
        label="Function"
      >
        {functions.map((f) => {
          return (
            <option value={f.name} selected>
              {f.name}
            </option>
          );
        })}
      </Select>
      <Select
        value="default"
        onChange={(e) => addFromIndex(e.target.selectedIndex)}
        label=""
        className="mt-1"
      >
        <option disabled value="default">
          Select a fan curve...
        </option>
        {fanCurves.map((fc) => (
          <option>{fc.name}</option>
        ))}
      </Select>

      {selectedFanCurves.map((x) => (
        <div className="text-sm my-2 ml-2">
          <span className="mr-1">○</span> <span>{x.name}</span>
          <span> ({x.getValue()} %)</span>
          <button
            onClick={() =>
              setSelectedFanCurve(
                selectedFanCurves.filter((f) => f.name != x.name)
              )
            }
            className="float-right border border-white px-1 rounded"
          >
            X
          </button>
        </div>
      ))}
    </FanCurveCard>
  );
}
