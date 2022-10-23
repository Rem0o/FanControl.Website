import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import ControlCard from "../components/demo/controlCard";
import TemperatureCard from "../components/demo/temperatureCard";
import {
  createTempSourceRandom,
  TemperatureSource,
} from "../components/demo/temperatureSource";
import { useState } from "react";
import {
  createlinearFanCurve,
  createMixFanCurve,
  FanCurve,
  LinearFanCurve,
  mixFunctions,
} from "../components/demo/fanCurve";
import FanCurveCard from "../components/demo/fanCurveCard";
import icons from "./../contents/icons";
import { useInterval } from "../hooks/customHooks";
import MixFanCurveCard from "../components/demo/mixFanCurveCard";

const pageTitle = "Demo";

const getSources = (): TemperatureSource[] => [
  createTempSourceRandom("CPU", 30, 60),
  createTempSourceRandom("GPU", 35, 85),
];

const getLinearFanCurves = (sources: TemperatureSource[]): LinearFanCurve[] => [
  createlinearFanCurve("Linear CPU", "CPU", sources),
  createlinearFanCurve("Linear GPU", "GPU", sources),
];

const LinearFanCurveCard = (fanCurve: LinearFanCurve) => {
  return (
    <FanCurveCard
      iconPath={icons.svgPaths.linear}
      fanCurve={fanCurve}
    ></FanCurveCard>
  );
};

const DemoPage = () => {
  const [sources, setSources] = useState(getSources());

  useInterval(1000, () => {
    let updatedSources = getSources();
    setSources(updatedSources);
  });

  let linears = getLinearFanCurves(sources);
  let mix = createMixFanCurve("Mix", mixFunctions[0], linears);
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
        <div className="flex gap-3 flex-wrap">
          {sources.map((x, i) => (
            <div key={i}>{TemperatureCard(x)}</div>
          ))}
        </div>
        Fan Curves
        <div className="flex gap-3 flex-wrap">
          {linears.map((x, i) => (
            <div key={i}>{LinearFanCurveCard(x)}</div>
          ))}
          <MixFanCurveCard name="Mix" fanCurves={linears}></MixFanCurveCard>
        </div>
      </div>
    </Layout>
  );
};

export default DemoPage;

export const Head: HeadFC = () => <title>{pageTitle}</title>;
