import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { useInterval, useTimeoutBooleanState } from "../../common/hooks";
import {
  createTempSource,
  createTempSourceRandom,
  type TemperatureSource
} from "./temperatureSource";
import type { FanCurve } from "./fanCurve";
import MixFanCurveCard from "./mixFanCurveCard";

interface DemoMixFanCurveCardProps {
  refreshId: number;
}

/**
 * Demo mix fan curve card with animated temperature sources
 * Features wiggle animation when scrolled into view or refreshed
 */
export const DemoMixFanCurveCard = ({ refreshId: refresh }: DemoMixFanCurveCardProps) => {
  const updateSources = (): [
    TemperatureSource,
    TemperatureSource,
    TemperatureSource
  ] => [
    createTempSourceRandom("a", 40, 60),
    createTempSourceRandom("b", 30, 70),
    createTempSourceRandom("c", 26, 65)
  ];

  const [sources, setSources] = useState([
    createTempSource("a", 50),
    createTempSource("b", 50),
    createTempSource("c", 50)
  ]);

  useInterval(3000, () => {
    setSources(updateSources());
  });

  const [isWiggling, setIsWiggling] = useTimeoutBooleanState(false, 500);

  useEffect(() => {
    setIsWiggling(true);
  }, [refresh]);

  const onInViewChange = (inView: boolean, e: IntersectionObserverEntry) => {
    if (inView) {
      setIsWiggling(true);
    }
  };

  // we mock random fan curves that outputs the temperature source as the %
  const mockedFanCurves: FanCurve[] = [
    { name: "CPU -> Case fans", getValue: () => sources[0].value },
    { name: "GPU -> Case fans", getValue: () => sources[1].value },
    { name: "SSD -> Case fans", getValue: () => sources[2].value }
  ];

  return (
    <InView
      className={isWiggling ? "animate-wiggle" : ""}
      triggerOnce={true}
      delay={500}
      threshold={1}
      onChange={onInViewChange}
    >
      <MixFanCurveCard
        name="Demo Case Fans"
        fanCurves={mockedFanCurves}
        selectedFanCurvesDefault={mockedFanCurves
          .slice(0, 2)
          .map((x) => x.name)}
      ></MixFanCurveCard>
    </InView>
  );
};
