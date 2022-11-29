import Card from "../card";
import type { FanCurve } from "./fanCurve";

const icon = (path: string) => (
  <svg className="h-12 w-12" viewBox="0 0 24 24">
    <path fill="currentColor" d={path} />
  </svg>
);

type Props = {
  iconPath: string;
  fanCurve: FanCurve;
  controlValueSuffix?: string;
  children?: React.ReactNode;
};

export default function FanCurveCard({
  iconPath,
  fanCurve,
  controlValueSuffix,
  children,
}: Props) {
  const background = "bg-primary-800";
  const value = fanCurve.getValue();
  const isValid = (number: number) => number >= 0 && number <= 100;

  return (
    <Card className={background}>
      <div className="flex w-56 flex-col text-white">
        <div className="flex flex-row items-center justify-center">
          {icon(iconPath)}
          <div className="ml-4 w-full border-b-2 border-white ">
            {fanCurve.name}
          </div>
        </div>
        <div>{children}</div>
        <div className="mt-1 flex flex-row justify-between">
          <div>
            <span>{isValid(value) ? value.toFixed(1) : "-"} %</span>{" "}
            <span>{controlValueSuffix}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
