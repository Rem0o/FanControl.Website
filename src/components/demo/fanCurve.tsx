import type { TemperatureSource } from "./temperatureSource";

type FanCurve = {
  name: string;
  getValue: () => number;
};

type LinearFanCurve = FanCurve & {
  selectedTemperature?: string;
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

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

let createlinearFanCurve = (
  name: string,
  selectedTemperature: string,
  sources: TemperatureSource[]
): LinearFanCurve => {
  const getValue = () => {
    let source = sources.find((x) => x.name == selectedTemperature);
    if (source) {
      return clamp((source.value - 30) * 3, 0, 100);
    }

    return -1;
  };

  return {
    name,
    selectedTemperature,
    getValue,
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
    },
  };
};

export type { FanCurve, LinearFanCurve, MixFanCurve, MixFunction };

export { mixFunctions, createlinearFanCurve, createMixFanCurve };
