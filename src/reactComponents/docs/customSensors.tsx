import icons from "../../common/icons";
import { type DocSection, parameters, ParametersCard } from "./docSection";

const timeAverage: DocSection = {
  key: "Time Average",
  icon: icons.svgPaths.time,
  render: () => {
    return (
      <>
        <p>
          The time average custom sensor averages the selected sensor over a set
          amount of time.
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
  }
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
  }
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
  }
};

const offsetSensor: DocSection = {
  key: "Offset",
  icon: icons.svgPaths.delta,
  render: () => {
    return (
      <>
        <p>The offset custom sensor allows to offset an existing sensor.</p>
        <br />

        <ParametersCard>
          <h2>Parameters:</h2>

          <ul>
            <li>
              Offset: Offset in degrees or percent (proportional) to be applied.
            </li>
            <li>
              Proportional offset: If checked, the offset will be proportional
              (%) instead of absolute (degree).
            </li>
          </ul>
        </ParametersCard>
      </>
    );
  }
};

export { timeAverage, mixSensor, fileSensor, offsetSensor };
