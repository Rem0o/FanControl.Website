import type { TemperatureSource } from "./temperatureSource";

type FanCurve = {
  name: string;
  getValue: () => number;
};

type LinearFanCurveConfig = {
  selectedTemperature?: TemperatureSource;
  minimumTemp: number;
  maximumTemp: number;
  minimumSpeed: number;
  maximumSpeed: number;
};

type MixFunction = {
  name: string;
  invoke: (fanCurves: FanCurve[]) => number;
};

type MixFanCurve = FanCurve & {
  selectedMixFunction: MixFunction;
};

const mixFunctions: MixFunction[] = [
  {
    name: "Max",
    invoke: (fanCurves) =>
      fanCurves.map((x) => x.getValue()).reduce((a, b) => (a > b ? a : b), -1)
  },
  {
    name: "Min",
    invoke: (fanCurves) =>
      fanCurves.map((x) => x.getValue()).reduce((a, b) => (a < b ? a : b), 101)
  },
  {
    name: "Average",
    invoke: (fanCurves) =>
      fanCurves.map((f) => f.getValue()).reduce((a, b) => a + b, 0) /
      fanCurves.length
  }
];

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

let createlinearFanCurve = (
  name: string,
  config: LinearFanCurveConfig,
  sources: TemperatureSource[]
): FanCurve => {
  const s = config;
  const tempSource = s.selectedTemperature ?? sources[0];

  return {
    name: name,
    getValue: () =>
      clamp(
        s.minimumSpeed +
          (tempSource.value - s.minimumTemp) *
            ((s.maximumSpeed - s.minimumSpeed) /
              (s.maximumTemp - s.minimumTemp)),
        0,
        100
      )
  };
};

let createMixFanCurve = (
  name: string,
  mixFunction: MixFunction,
  fanCurves: FanCurve[]
): MixFanCurve => {
  return {
    name,
    selectedMixFunction: mixFunction,
    getValue: () => {
      return mixFunction.invoke(fanCurves);
    }
  };
};

export type { FanCurve, LinearFanCurveConfig, MixFanCurve, MixFunction };

export { mixFunctions, createlinearFanCurve, createMixFanCurve };
