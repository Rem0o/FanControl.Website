import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { icons } from "../../common/icons";
import Select from "../select";
import {
  createMixFanCurve,
  type FanCurve,
  type MixFanCurve,
  mixFunctions
} from "./fanCurve";
import FanCurveCard from "./fanCurveCard";

export default function MixFanCurveCard({
  name,
  fanCurves,
  selectedFanCurvesDefault
}: {
  name: string;
  fanCurves: FanCurve[];
  selectedFanCurvesDefault?: string[];
}) {
  const [selectedFanCurveNames, setSelectedFanCurveNames] = useState(
    selectedFanCurvesDefault ?? fanCurves.map((x) => x.name)
  );

  const selectedFanCurves = fanCurves.filter((x) =>
    selectedFanCurveNames.includes(x.name)
  );

  const [selectedFunction, setSelectedFunction] = useState(mixFunctions[0]);

  const addFromIndex = (index: number) => {
    let fc = fanCurves[index - 1];
    if (!selectedFanCurveNames.includes(fc.name)) {
      setSelectedFanCurveNames((current) => [...current, fc.name]);
    }
  };

  const fanCurve: MixFanCurve = createMixFanCurve(
    name,
    selectedFunction,
    selectedFanCurves
  );

  const suffix =
    selectedFanCurveNames.length > 0
      ? (selectedFanCurves.find((x) => x.getValue() == fanCurve.getValue())
          ?.name ?? "Average")
      : selectedFunction.name;

  return (
    <FanCurveCard iconPath={icons.mix} fanCurve={fanCurve}>
      <Select
        onChange={(e) =>
          setSelectedFunction(mixFunctions[e.target.selectedIndex])
        }
        value={fanCurve.selectedMixFunction.name}
        className="text-accent"
        labelClassName=""
        label="Function"
      >
        {mixFunctions.map((f) => {
          return (
            <option key={f.name} value={f.name}>
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
        <option key="-1" disabled value="default">
          Add a fan curve...
        </option>
        {fanCurves.map((fc, i) => (
          <option key={i}>{fc.name}</option>
        ))}
      </Select>

      {selectedFanCurves.map((x, i) => (
        <div
          key={i}
          className={twMerge(
            "my-2 ml-2 text-sm",
            suffix == x.name || selectedFunction.name == "Average"
              ? "text-accent"
              : ""
          )}
        >
          <span className="mr-1">○</span> <span>{x.name}</span>
          <span className=""> ({x.getValue()} %)</span>
          <button
            onClick={() =>
              setSelectedFanCurveNames(
                selectedFanCurveNames.filter((f) => f != x.name)
              )
            }
            className="float-right rounded border border-white px-1 text-white"
          >
            X
          </button>
        </div>
      ))}
    </FanCurveCard>
  );
}
