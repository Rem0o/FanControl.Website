import { useEffect, useState } from "react";
import icons from "../../common/icons";
import Select from "../select";
import FanCurveCard from "./fanCurveCard";
import type { TemperatureSource } from "./temperatureSource";
import { createlinearFanCurve, type LinearFanCurveConfig } from "./fanCurve";
import { twMerge } from "tailwind-merge";

export default function LinearFanCurveCard({
  name,
  linearFanCurve,
  availableTemperatures
}: {
  name: string;
  linearFanCurve: LinearFanCurveConfig;
  availableTemperatures: TemperatureSource[];
}) {
  const [fanCurveConfig, setFanCurveConfig] = useState(linearFanCurve);
  const fanCurve = createlinearFanCurve(
    name,
    fanCurveConfig,
    availableTemperatures
  );

  useEffect(() => {
    setFanCurveConfig({
      ...fanCurveConfig,
      selectedTemperature: linearFanCurve.selectedTemperature
    });
  }, [linearFanCurve.selectedTemperature]);

  return (
    <FanCurveCard iconPath={icons.svgPaths.linear} fanCurve={fanCurve}>
      <Select
        onChange={(e) =>
          setFanCurveConfig({
            ...fanCurveConfig,
            selectedTemperature: availableTemperatures[e.target.selectedIndex]
          })
        }
        value={
          fanCurveConfig.selectedTemperature != null
            ? getSelectOptionValue(fanCurveConfig.selectedTemperature)
            : ""
        }
        className="text-accent"
        labelClassList=""
        label="Temperature Source"
      >
        {availableTemperatures.map((t) => {
          return (
            <option key={t.name} value={getSelectOptionValue(t)}>
              {getSelectOptionValue(t)}
            </option>
          );
        })}
      </Select>
      <div className="h-2"></div>
      <CardNumberInput
        onChange={(v) =>
          setFanCurveConfig({
            ...fanCurveConfig,
            minimumTemp: Number.parseInt(v.target.value)
          })
        }
        value={fanCurveConfig.minimumTemp}
        className="mr-5 w-24"
        label="Min. temp."
        unit="°C"
      />
      <CardNumberInput
        onChange={(v) =>
          setFanCurveConfig({
            ...fanCurveConfig,
            maximumTemp: Number.parseInt(v.target.value)
          })
        }
        value={fanCurveConfig.maximumTemp}
        className="w-24"
        label="Max. temp."
        unit="°C"
      />
      <CardNumberInput
        onChange={(v) =>
          setFanCurveConfig({
            ...fanCurveConfig,
            minimumSpeed: Number.parseInt(v.target.value)
          })
        }
        value={fanCurveConfig.minimumSpeed}
        className="mr-5 w-24"
        label="Min. speed"
        unit="%"
      />
      <CardNumberInput
        onChange={(v) =>
          setFanCurveConfig({
            ...fanCurveConfig,
            maximumSpeed: Number.parseInt(v.target.value)
          })
        }
        value={fanCurveConfig.maximumSpeed}
        className="w-24"
        label="Max. speed"
        unit="%"
      />
    </FanCurveCard>
  );
}

function CardNumberInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    unit: string;
  }
): JSX.Element {
  const { label, unit, className, ...attr } = props;
  const [[hover, focus], setHoverAndFocus] = useState([false, false]);

  return (
    <div className={twMerge("relative inline-block", className)}>
      <div className="text-xs text-gray-300 ">{label}</div>
      <div>
        <input
          className="inline-block w-full border-b-2 border-b-white bg-transparent "
          type="number"
          {...attr}
          onMouseEnter={() => setHoverAndFocus([true, focus])}
          onMouseLeave={() => setHoverAndFocus([false, focus])}
          onFocus={() => setHoverAndFocus([hover, true])}
          onBlur={() => setHoverAndFocus([hover, false])}
          min={0}
          max={100}
        />
        <span className={`absolute ${hover || focus ? "right-5" : "right-1"}`}>
          {unit}
        </span>
      </div>
    </div>
  );
}

function getSelectOptionValue(t: TemperatureSource): string {
  return `${t?.value} °C - ${t.name}`;
}
