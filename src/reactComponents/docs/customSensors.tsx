import type consts from "../../common/consts";
import { icons } from "../../common/icons";
import Border from "../border";
import { NiceSmallerHeader } from "../niceHeader";
import { type DocSection, parameters } from "./docSection";

const timeAverage: DocSection = {
  key: "Time Average",
  icon: icons.time,
  render: () => {
    return (
      <>
        <p>
          The time average custom sensor averages the selected sensor over a set
          amount of time.
        </p>
        <br />

        <Border>
          <NiceSmallerHeader text="Parameters" />

          <ul>
            <li>Temperature source: {parameters.tempSource}</li>
            <li>Time: Averaging period of the selected temperature source.</li>
          </ul>
        </Border>
      </>
    );
  }
};

const mixSensor: DocSection = {
  key: "Mix Sensor",
  icon: icons.temperature,
  render: () => {
    return (
      <>
        <p>
          The mix custom sensor applies a function to the selected temperature
          sensors.
        </p>
        <br />

        <Border>
          <NiceSmallerHeader text="Parameters" />

          <ul>
            <li>Function: {parameters.functions}</li>
            <li>
              Add sensor: Add any existing temperature sensor to the mix.{" "}
            </li>
          </ul>
        </Border>
      </>
    );
  }
};

const fileSensor: DocSection = {
  key: "File",
  icon: icons.file,
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

        <Border>
          <NiceSmallerHeader text="Parameters" />

          <ul>
            <li>Path: Path of the sensor file.</li>
          </ul>
        </Border>
      </>
    );
  }
};

const offsetSensor: DocSection = {
  key: "Offset",
  icon: icons.delta,
  render: () => {
    return (
      <>
        <p>The offset custom sensor allows to offset an existing sensor.</p>
        <br />

        <Border>
          <NiceSmallerHeader text="Parameters" />

          <ul>
            <li>
              Offset: Offset in degrees or percent (proportional) to be applied.
            </li>
            <li>
              Proportional offset: If checked, the offset will be proportional
              (%) instead of absolute (degree).
            </li>
          </ul>
        </Border>
      </>
    );
  }
};

export { timeAverage, mixSensor, fileSensor, offsetSensor };
