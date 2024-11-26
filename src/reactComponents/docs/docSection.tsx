import type { SvgIcon } from "../../common/icons";

export type DocSection = {
  key: string;
  icon?: SvgIcon;
  render: () => JSX.Element;
};

export const parameters = {
  hysteresis: "Minimum temperature difference for a change to occur.",
  responseTime: "Minimum time for a change to occur.",
  onThewayDown:
    "Hysteresis and response time parameters will only apply if the temperature is dropping, not increasing.",
  ignoreHysteresis:
    "Hysteresis and response time parameters will be ignored as soon at the minimum or maximum temperature point set by the fan curve is hit. Hysteresis will apply when re-entering the set temperature range.",
  tempSource: "Source to use as input.",
  functions: "Choose between Max, Min, Average, Sum, Subtract."
};
