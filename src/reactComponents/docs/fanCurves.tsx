import { type DocSection, parameters, ParametersCard } from "./docSection";
import MixFanCurveCard from "../demo/mixFanCurveCard";
import {
  createTempSource,
  createTempSourceRandom,
  type TemperatureSource
} from "../demo/temperatureSource";
import icons from "../../common/icons";
import { useState } from "react";
import { useInterval } from "../../common/hooks";
import LinearFanCurveCard from "../demo/linearFanCurveCard";
import type { FanCurve, LinearFanCurveConfig } from "../demo/fanCurve";

const DocDemoLinearFanCurveCard = () => {
  const updateSources = (): [TemperatureSource, TemperatureSource] => [
    createTempSourceRandom("CPU Core", 25, 75),
    createTempSourceRandom("GPU Core", 30, 70)
  ];

  const [sources, setSources] = useState([
    createTempSource("CPU Core", 35),
    createTempSource("GPU Core", 40)
  ]);

  useInterval(3000, () => {
    setSources(updateSources());
  });

  const linearFanCurve: LinearFanCurveConfig = {
    minimumTemp: 30,
    maximumTemp: 70,
    minimumSpeed: 40,
    maximumSpeed: 100,
    selectedTemperature: sources[0]
  };

  return (
    <LinearFanCurveCard
      name="Linear demo"
      availableTemperatures={sources}
      linearFanCurve={linearFanCurve}
    />
  );
};

const linear: DocSection = {
  key: "Linear",
  icon: icons.svgPaths.linear,
  render: () => {
    return (
      <>
        <div className="my-5">
          <DocDemoLinearFanCurveCard />
        </div>
        <p>
          The linear fan curve applies a linear function based on a temperature
          source.
        </p>
        <br />
        <p>Below the minimum temperature, minimum speed is applied.</p>
        <p>Above the maximum temperature, maximum speed is applied.</p>

        <br />

        <ParametersCard>
          <h2>Parameters:</h2>

          <ul>
            <li>
              Min. and max. temperature : Temperature bounds to be interpolated
              between.
            </li>
            <li>
              Min. and max. speed : Fan speeds as % to be interpolated between
              the min. and max. temperature.{" "}
            </li>
            <li>Temperature source: {parameters.tempSource}</li>
            <li>Hysteresis: {parameters.hysteresis}</li>
            <li>Response time: {parameters.responseTime}</li>
          </ul>
        </ParametersCard>
      </>
    );
  }
};

const graph: DocSection = {
  key: "Graph",
  icon: icons.svgPaths.graph,
  render: () => {
    return (
      <>
        <p>
          The graph fan curve applies a custom function based on a temperature
          source.
        </p>

        <br />

        <p>
          Press "Edit" to open up the editor. Left click to add a point, right
          click to remove one. Hover your mouse over a point and use the
          "Selected Point" input boxes to precisely change its location.
        </p>

        <br />
        <ParametersCard>
          <h2>Parameters:</h2>

          <ul>
            <li>Temperature source: {parameters.tempSource}</li>
            <li>Hysteresis: {parameters.hysteresis}</li>
            <li>Response time: {parameters.responseTime}</li>
          </ul>
        </ParametersCard>
      </>
    );
  }
};

const DocDemoMixFanCurveCard = () => {
  const updateSources = (): [TemperatureSource, TemperatureSource] => [
    createTempSourceRandom("a", 30, 70),
    createTempSourceRandom("b", 30, 70)
  ];

  const [sources, setSources] = useState([
    createTempSource("a", 50),
    createTempSource("b", 50)
  ]);

  useInterval(3000, () => {
    setSources(updateSources());
  });

  // we mock random fan curves that outputs the temperature source as the %
  const mockedFanCurves: FanCurve[] = [
    { name: "A linear fan curve", getValue: () => sources[0].value },
    { name: "Graph fan curve", getValue: () => sources[1].value }
  ];

  return (
    <MixFanCurveCard
      name="Mix demo"
      fanCurves={mockedFanCurves}
      selectedFanCurvesDefault={mockedFanCurves.slice(0, 1).map((x) => x.name)}
    ></MixFanCurveCard>
  );
};

const flat: DocSection = {
  key: "Flat",
  icon: icons.svgPaths.flat,
  render: () => {
    return (
      <>
        <p>
          The flat fan curve simply applies a fixed %. Usefull if you want to
          set and change the % of multiple controls.
        </p>
        <br />

        <ParametersCard>
          <h2>Parameters:</h2>

          <ul>
            <li>Fan speed %: Percent.</li>
          </ul>
        </ParametersCard>
      </>
    );
  }
};

const sync: DocSection = {
  key: "Sync",
  icon: icons.svgPaths.sync,
  render: () => {
    return (
      <>
        <p>
          The sync fan curve will output the same % as the selected control. Use
          it to sync multiple fans to a single control. Whatever fan curve you
          apply to that control, all the synced fans will also follow that new
          fan curve.
        </p>
        <br />

        <ParametersCard>
          <h2>Parameters:</h2>

          <ul>
            <li>Selected control: The control to sync with.</li>
            <li>Offset: Offset in % to be applied to the selected control.</li>
            <li>
              Proportional offset: If checked, the offset will be proportional
              instead of absolute.
            </li>
          </ul>
        </ParametersCard>
      </>
    );
  }
};

const trigger: DocSection = {
  key: "Trigger",
  icon: icons.svgPaths.trigger,
  render: () => {
    return (
      <>
        <p>
          The trigger fan curve will hold its fan speed until one of the two
          changing point is triggered. Below the idle temperature, idle fan
          speed is applied until the temperature gets back up to the load
          temperature. Above the load temperature, load fan speed is applied
          until the temperature gets back down to the idle temperature.
        </p>
        <br />

        <ParametersCard>
          <h2>Parameters:</h2>

          <ul>
            <li>Response Time: {parameters.responseTime}</li>
          </ul>
        </ParametersCard>
      </>
    );
  }
};

const mix: DocSection = {
  key: "Mix Fan Curve",
  icon: icons.svgPaths.mix,
  render: () => {
    return (
      <>
        <div className="my-5">
          <DocDemoMixFanCurveCard />
        </div>

        <p>
          The mix fan curve will combine multiple existing fan curves using a
          mix function, like max or average.
        </p>

        <br />
        <ParametersCard>
          <h2>Parameters:</h2>

          <ul>
            <li>Function: {parameters.functions}</li>
            <li>Fan curves: Add any existing fan curve to the mix. </li>
          </ul>
        </ParametersCard>
      </>
    );
  }
};

export { linear, graph, mix, trigger, flat, sync };
