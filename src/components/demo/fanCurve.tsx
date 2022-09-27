type FanCurve = {
  name: string;
  selectedTemperature?: string;
  getValue: () => number;
};

type LinearFanCurve = FanCurve & {
  selectedTemperature?: string;
};

export type { FanCurve, LinearFanCurve };
