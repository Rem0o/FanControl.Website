import { type DocSection, parameters } from "./docSection";
import MixFanCurveCard from "../demo/mixFanCurveCard";
import {
  createTempSource,
  createTempSourceRandom,
  type TemperatureSource
} from "../demo/temperatureSource";
import { icons } from "../../common/icons";
import { useState } from "react";
import { useInterval } from "../../common/hooks";
import LinearFanCurveCard from "../demo/linearFanCurveCard";
import type { FanCurve, LinearFanCurveConfig } from "../demo/fanCurve";
import Border from "../border";
import { NiceSmallerHeader } from "../niceHeader";
import { SmallIcon } from "../icon";

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

const rpmMode: DocSection = {
  key: "RPM mode",
  render: () => (
    <p>
      All fan curves can used in RPM mode from their
      <span className="inline-block align-middle">
        {SmallIcon(icons.threeDot)}
      </span>{" "}
      menu. Instead of outputting a specific %, it will output a target RPM
      value. Only controls with a valid calibration can use fan curves in RPM
      mode.
    </p>
  )
};

const linear: DocSection = {
  key: "Linear",
  icon: icons.linear,
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

        <Border>
          <NiceSmallerHeader text="Parameters" />

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
            <li>
              Hysteresis only applies on the way down: {parameters.onThewayDown}
            </li>
            <li>
              Ignore hysteresis at minimum and maximum temps:{" "}
              {parameters.ignoreHysteresis}
            </li>
          </ul>
        </Border>
      </>
    );
  }
};

const graph: DocSection = {
  key: "Graph",
  icon: icons.graph,
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
        <Border>
          <NiceSmallerHeader text="Parameters" />

          <ul>
            <li>Temperature source: {parameters.tempSource}</li>
            <li>Hysteresis: {parameters.hysteresis}</li>
            <li>Response time: {parameters.responseTime}</li>
            <li>
              Hysteresis only applies on the way down: {parameters.onThewayDown}
            </li>
            <li>
              Ignore hysteresis at minimum and maximum temps:{" "}
              {parameters.ignoreHysteresis}
            </li>
          </ul>
        </Border>
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
  icon: icons.flat,
  render: () => {
    return (
      <>
        <p>
          The flat fan curve simply applies a fixed %. Useful if you want to
          set and change the % of multiple controls.
        </p>
        <br />

        <Border>
          <NiceSmallerHeader text="Parameters" />

          <ul>
            <li>Fan speed %: Percent.</li>
          </ul>
        </Border>
      </>
    );
  }
};

const sync: DocSection = {
  key: "Sync",
  icon: icons.sync,
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

        <Border>
          <NiceSmallerHeader text="Parameters" />

          <ul>
            <li>Selected control: The control to sync with.</li>
            <li>Offset: Offset in % to be applied to the selected control.</li>
            <li>
              Proportional offset: If checked, the offset will be proportional
              instead of absolute.
            </li>
          </ul>
        </Border>
      </>
    );
  }
};

const trigger: DocSection = {
  key: "Trigger",
  icon: icons.trigger,
  render: () => {
    return (
      <>
        <p>
          The trigger fan curve will hold its fan speed until one of the two
          changing points is reached. Below the idle temperature, idle fan
          speed is applied until the temperature gets back up to the load
          temperature. Above the load temperature, load fan speed is applied
          until the temperature gets back down to the idle temperature.
        </p>
        <br />

        <Border>
          <NiceSmallerHeader text="Parameters" />

          <ul>
            <li>Response Time: {parameters.responseTime}</li>
          </ul>
        </Border>
      </>
    );
  }
};

const mix: DocSection = {
  key: "Mix Fan Curve",
  icon: icons.mix,
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
        <Border>
          <NiceSmallerHeader text="Parameters" />

          <ul>
            <li>Function: {parameters.functions}</li>
            <li>Fan curves: Add any existing fan curve to the mix. </li>
          </ul>
        </Border>
      </>
    );
  }
};

const auto: DocSection = {
  key: "Auto",
  icon: icons.auto,
  render: () => (
    <>
      <p>
        The auto fan curve is designed to find the lowest possible speed to
        sustain a desired load temperature. It will work best in constant load
        scenarios, less so in regular usage. Internally, the function will
        define 2 distinct temperatures "zones": idle and load. During idle, up
        to load, it will act like a regular linear fan curve. In the load zone,
        defined by the Load Temperature and Deadband parameters, it will use a
        feedback loop to look at the temperature trend and increase or decrease
        the speed accordingly. If the temperature trend is slowly decreasing, it
        will decrease the speed little by little until an equilibrium state is
        found, finding the minimum fan speed required to hold a steady load
        temperature.
      </p>
      <br />

      <Border>
        <NiceSmallerHeader text="Parameters" />

        <ul>
          <li>
            Idle temp. : Temperature threshold for the minimum fan speed.{" "}
          </li>
          <li>Load temp. : Desired load temperature to be sustained. </li>
          <li>Min. fan speed</li>
          <li>Max. fan speed</li>
          <li>
            Step: Rate at which the % will change after the given response time.
            Step is half when temperature is decreasing.
          </li>
          <li>
            Deadband: Range under the load temperature defining the "load"
            temperature zone.
          </li>
          <li>
            Response time: {parameters.responseTime}. Parameter is doubled when
            temperature is decreasing.
          </li>
        </ul>
      </Border>
    </>
  )
};

export { rpmMode, linear, graph, mix, trigger, flat, sync, auto };
