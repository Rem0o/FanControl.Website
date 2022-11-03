import React from "react";
import DocSection from "./docSection";
import icons from "../../contents/icons";

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

export { linear, graph };
