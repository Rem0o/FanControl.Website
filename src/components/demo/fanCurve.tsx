type FanCurve = {
  name: string;
  getValue: () => number;
};

type LinearFanCurve = FanCurve & {
  selectedTemperature?: string;
};

export type { FanCurve, LinearFanCurve };
