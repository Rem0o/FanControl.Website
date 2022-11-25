import React, { useState } from "react";
import { DocSection, parameters, ParametersCard } from "./docSection";
import icons from "../../contents/icons";

const timeAverage: DocSection = {
  key: "Time Average",
  icon: icons.svgPaths.time,
  render: () => {
    return (
      <>
        <p>
          The time average custom sensor averages the selected sensor over a set
          ammount of time.
        </p>
        <br />

        <ParametersCard>
          <h2>Parameters:</h2>

          <ul>
            <li>Temperature source: {parameters.tempSource}</li>
            <li>Time: Averaging period of the selected temperature source.</li>
          </ul>
        </ParametersCard>
      </>
    );
  },
};

const mixSensor: DocSection = {
  key: "Mix Sensor",
  icon: icons.svgPaths.temperature,
  render: () => {
    return (
      <>
        <p>
          The mix custom sensor applies a function to the selected temperature
          sensors.
        </p>
        <br />

        <ParametersCard>
          <h2>Parameters:</h2>

          <ul>
            <li>Function: {parameters.functions}</li>
            <li>
              Add sensor: Add any existing temperature sensor to the mix.{" "}
            </li>
          </ul>
        </ParametersCard>
      </>
    );
  },
};

const fileSensor: DocSection = {
  key: "File",
  icon: icons.svgPaths.file,
  render: () => {
    return (
      <>
        <p>
          The file custom sensor reads data from a given file. The temperature
          must be written directly into the ".sensor" file as text in celcius on
          the first line. Use this sensor as a way to inject a sensor from any
          other source that the software doesn't support natively.
        </p>
        <br />

        <ParametersCard>
          <h2>Parameters:</h2>

          <ul>
            <li>Path: Path of the sensor file.</li>
          </ul>
        </ParametersCard>
      </>
    );
  },
};

export { timeAverage, mixSensor, fileSensor };
