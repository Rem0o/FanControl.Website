import { twMerge } from "tailwind-merge";
import { useTimeoutBooleanState } from "../common/CustomHooks";
import icons from "./../common/Icons";

interface Props {
  spinInitially?: boolean;
}

const SpinningLogo = (props: React.SVGProps<SVGSVGElement> & Props) => {
  const { onMouseEnter, className, viewBox, ...restOfProps } = props;
  const [isSpinning, setIsSpinning] = useTimeoutBooleanState(
    props.spinInitially ? props.spinInitially : false,
    3000
  );

  return (
    <svg
      onMouseEnter={(e) => {
        setIsSpinning(true);
        if (onMouseEnter) {
          onMouseEnter(e);
        }
      }}
      className={twMerge(
        `${isSpinning ? "animate-spin" : ""} h-10 w-10 hover:animate-spin`,
        className
      )}
      viewBox={viewBox ? viewBox : "0 0 24 24"}
    >
      <path fill="currentColor" d={icons.svgPaths.fan} />
    </svg>
  );
};

export { SpinningLogo };
