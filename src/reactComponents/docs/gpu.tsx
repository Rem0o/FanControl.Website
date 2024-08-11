import { icons } from "../../common/icons";
import type { DocSection } from "./docSection";

export const nvidia: DocSection = {
  key: "NVIDIA",
  icon: icons.nvidia,
  render: () => {
    return (
      <>
        <p>
          Modern Nvidia GPUs (RTX) have a few limitation when it comes to
          controlling their fans from a third party application. Most notably:
        </p>
        <ul>
          <li>
            Minimum %: Their is a 30% minimum value and 0 RPM can't be applied
            manually.
          </li>
          <li>
            0 RPM minimum temperature: usually around the 45 degree range.
          </li>
          <li>
            0 RPM maximum power draw: Having multiple monitors active may exceed
            that maximum power draw.
          </li>
        </ul>
        <p>
          To play arround these limitations, the software will release its
          control over the GPU when the command hits 0%. If the card supports
          natively 0 RPM, it will be able to enter 0 RPM mode. However, most
          cards will have built-in conditions for 0 RPM to trigger.
        </p>
        <br />
        <p>
          With these caveats in mind, a simple graph for a GPU needs to have its
          0% point at or below the zero RPM temperature point, then staircase up
          to 30%. Rest of the graph is up to the user.
        </p>
      </>
    );
  }
};

export const amd: DocSection = {
  key: "AMD",
  icon: icons.amd,
  render: () => {
    return (
      <>
        <p>
          Modern AMD GPUs have access to the Adrenaline software to monitor and
          control various aspects like monitoring and overclocking. The software
          uses the same interface (ALDX) to get the temperature data, fan RPM
          and to control the fan. This comes with a few caveat for the fan to be
          controlled. Only using the temperatures without controlling the fan do
          not come with these caveats:
        </p>

        <ul>
          <li>
            Overclocking reset: any fan setting applied from the software will
            reset the overcloking tuning settings in Adrenaline to their default
            values.
          </li>
          <li>
            Zero RPM: AMD gpus have a set minimum temperature for Zero RPM to
            come into effect. The temperature is identified with a dotted line
            in the Adrenaline Graph. This inherent temperature point must be
            taken into consideration when creating a fan curve for the GPU.
          </li>
          <li>
            Minimum %: There is a minimum % (0% excluded, see Zero RPM) a card
            can take as an input command, usually arround to 30%. Below that,
            the card will refuse the command and will keep the minimum %.
          </li>
        </ul>

        <p>
          With these caveats in mind, a simple graph for a GPU needs to have its
          0% point at or below the zero RPM temperature point, then staircase up
          to the minimum %. Rest of the graph is up to the user.
        </p>
      </>
    );
  }
};
