import React, { useState } from "react";
import DocSection from "./docSection";
import icons from "../../contents/icons";
import MixFanCurveCard from "../demo/mixFanCurveCard";
import {
  createTempSource,
  createTempSourceRandom,
  TemperatureSource,
} from "../demo/temperatureSource";
import { useInterval } from "../../utilities/customHooks";
import { FanCurve } from "../demo/fanCurve";

const parameters = {
  hysteresis: "Minimum temperature difference for a change to occur.",
  responseTime: "Minimum time for a change to occur.",
  tempSource: "Source to use as input.",
};

const linear: DocSection = {
  key: "Linear",
  icon: icons.svgPaths.linear,
  render: () => (
    <>
      <p>
        The linear fan curve applies a linear function based on a temperature
        source.
      </p>
      <br />
      <p>Below the minimum temperature, minimum speed is applied.</p>
      <p>Above the maximum temperature, maximum speed is applied.</p>

      <br />
      <h2>Parameters:</h2>

      <ul>
        <li>
          Min. and max. temperature : Temperature bounds between to interpolate
          between.
        </li>
        <li>
          Min. and max. speed : Fan speeds as % to be interpolated between the
          min. and max. temperature.{" "}
        </li>
        <li>Temperature source: {parameters.tempSource}</li>
        <li>Hysteresis: {parameters.hysteresis}</li>
        <li>Response time: {parameters.responseTime}</li>
      </ul>
    </>
  ),
};

const graph: DocSection = {
  key: "Graph",
  icon: icons.svgPaths.graph,
  render: () => {
    return (
      <>
        <p>
          The graph fan curve applies a custom drawn function based on a
          temperature source.
        </p>

        <br />
        <h2>Parameters:</h2>

        <ul>
          <li>Temperature source: {parameters.tempSource}</li>
          <li>Hysteresis: {parameters.hysteresis}</li>
          <li>Response time: {parameters.responseTime}</li>
        </ul>
      </>
    );
  },
};

const DocDemoMixFanCurveCard = () => {
  const updateSources = (): [TemperatureSource, TemperatureSource] => [
    createTempSourceRandom("a", 30, 70),
    createTempSourceRandom("b", 30, 70),
  ];

  const [sources, setSources] = useState([
    createTempSource("a", 50),
    createTempSource("b", 50),
  ]);

  useInterval(1000, () => {
    setSources(updateSources());
  });

  // we mock random fan curves that outputs the temperature source as the %
  const mockedFanCurves: FanCurve[] = [
    { name: "A linear fan curve", getValue: () => sources[0].value },
    { name: "Graph fan curve", getValue: () => sources[1].value },
  ];

  return (
    <MixFanCurveCard
      name="Mix demo"
      fanCurves={mockedFanCurves}
      selectedFanCurvesDefault={mockedFanCurves.slice(0, 1).map((x) => x.name)}
    ></MixFanCurveCard>
  );
};

const mix: DocSection = {
  key: "Mix",
  icon: icons.svgPaths.mix,
  render: () => {
    return (
      <>
        <p>
          The mix fan curve will combine multiple existing fan curves using a
          mix function, like max or average.
        </p>

        <div className="my-5">
          <DocDemoMixFanCurveCard />
        </div>

        <h2>Parameters:</h2>

        <ul>
          <li>Function: Choose between Max, Min, Average, Sum, Subtract.</li>
          <li>Fan curves: Add any existing fan curve to the mix. </li>
        </ul>
      </>
    );
  },
};

export { linear, graph, mix };
