import React, { useState } from "react";
import { DocSection, parameters } from "./docSection";
import icons from "../../contents/icons";
import MixFanCurveCard from "../demo/mixFanCurveCard";
import {
  createTempSource,
  createTempSourceRandom,
  TemperatureSource,
} from "../demo/temperatureSource";
import { useInterval } from "../../utilities/customHooks";
import { FanCurve } from "../demo/fanCurve";

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

        <p>
          Press "Edit" to open up the editor. Left click to add a point, right
          click to remove one. Hover your mouse over a point and use the
          "Selected Point" input boxes to precisely change its location.
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
        <br/>
        <h2>Parameters:</h2>

        <ul>
          <li>Fan speed %: Percent.</li>
        </ul>
      </>
    );
  },
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
        <br/>
        <h2>Parameters:</h2>

        <ul>
          <li>Selected control: The control to sync with.</li>
          <li>Offset: Offset in % to be applied to the selected control.</li>
        </ul>
      </>
    );
  },
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
        <br/>
        <h2>Parameters:</h2>

        <ul>
          <li>Response Time: {parameters.responseTime}</li>
        </ul>
      </>
    );
  },
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


export { linear, graph, mix, trigger, flat, sync };
