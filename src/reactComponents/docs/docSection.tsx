import Card from "../card";

export type DocSection = {
  key: string;
  icon?: string;
  render: () => JSX.Element;
};

export const parameters = {
  hysteresis: "Minimum temperature difference for a change to occur.",
  responseTime: "Minimum time for a change to occur.",
  tempSource: "Source to use as input.",
  functions: "Choose between Max, Min, Average, Sum, Subtract.",
};

export const ParametersCard = ({ children }: { children: React.ReactNode }) => {
  return <Card className="bg-body-50">{children}</Card>;
};
