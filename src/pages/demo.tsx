import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import ControlCard from "../components/demo/controlCard";
import TemperatureCard from "../components/demo/temperatureCard";
import createTempSource, {
  TemperatureSource,
} from "../components/demo/temperatureSource";
import { useState } from "react";
import { FanCurve, LinearFanCurve } from "../components/demo/fanCurve";
import FanCurveCard from "../components/demo/fanCurveCard"
import icons from "./../contents/icons";
import { useInterval } from "../hooks/customHooks";

const pageTitle = "Demo";

const getSources = (): TemperatureSource[] => [
  createTempSource("CPU", 30, 60),
  createTempSource("GPU", 35, 85),
];

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

let linearFanCurve = (
  name: string,
  selectedTemperature: string,
  sources: TemperatureSource[]
): FanCurve => {
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

let mixFanCurve = ( name: string, fanCurves: FanCurve[]) : FanCurve => {

  const max = fanCurves.reduce((a, b) => {
    if ( b.getValue() >  a.getValue()){
      return b;
    }

    return a;
  })

  return {
    name,
    getValue: () => {
      return max.getValue();
    }
  }
}

const getLinearFanCurves = (sources: TemperatureSource[]): LinearFanCurve[] => [
  linearFanCurve("Linear CPU", "CPU", sources),
  linearFanCurve("Linear GPU", "GPU", sources)
];

const LinearFanCurveCard = (fanCurve:LinearFanCurve) => {
  return FanCurveCard("M3.5,18.5L9.5,12.5L13.5,16.5L22,6.92L20.59,5.5L13.5,13.5L9.5,9.5L2,17L3.5,18.5Z", fanCurve);
}

const MixFanCurveCard = (fanCurve:FanCurve) => {
  return FanCurveCard(icons.svgPaths.mix, fanCurve);
}

const DemoPage = () => {
  const [sources, setSources] = useState(getSources());

  useInterval(1000, () => {
    let updatedSources = getSources();
    setSources(updatedSources);
  });

  let linears = getLinearFanCurves(sources);
  let mix = mixFanCurve("Mix", linears);
  let fanCurves = [...linears, mix];

  return (
    <Layout pageTitle={pageTitle}>
      <div className="flex gap-3 w-full flex-wrap flex-col ">
        Controls
        <div className="flex gap-3 flex-wrap">
          <ControlCard name="Front Fan" availableFanCurves={fanCurves} />
          <ControlCard name="Top Fan" availableFanCurves={fanCurves} />
        </div>
        Temperatures
        <div className="flex gap-3 flex-wrap">{sources.map(TemperatureCard)}</div>
        Fan Curves
        <div className="flex gap-3 flex-wrap">{linears.map(LinearFanCurveCard)}{MixFanCurveCard(mix)}</div>
      </div>
    </Layout>
  );
};

export default DemoPage;

export const Head: HeadFC = () => <title>{pageTitle}</title>;
