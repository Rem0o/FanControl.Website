import { icons } from "../../common/icons";
import Border from "../border";
import { SmallIcon } from "../icon";
import { NiceSmallerHeader } from "../niceHeader";
import type { DocSection } from "./docSection";

const curvesAndManualControlText = (
  <p>
    A control (fan) can either be set manually, or through a fan curve. To assign a fan curve to a control, use the "curve" dropdown menu on the control card and select the desired curve. To use manual control instead, select the "Manual control" checkbox from the  <SmallIcon icon={icons.threeDot} className="inline" /> menu of any control card.
  </p>
);

const speedPairingText = (
  <p>
    Speed sensor pairing is the first step to configure a control. It will give
    the control context as to how it is operating at any given time. Pairing is
    required for calibration. You can either pair manually by selecting the
    speed sensor yourself, or automatically through the pairing utility.
  </p>
);

const calibrationText = (
  <p>
    Fan calibration is used to tell the software how a specific fan behaves. It
    will find its starting point, stopping point, maximum and minimum speed. It
    will also create a full RPM/% graph to know what % power is required to run
    the fan at a specific RPM. This graph is required if you want to assign a
    fan curve in RPM mode.
  </p>
);

const parameters = (
  <Border className="mt-10">
    <NiceSmallerHeader text="Control parameters" />
    <ul>
      <li>
        Step up %: Maximum rate at which the control can change its value going
        up.
      </li>
      <li>
        Step down %: Maximum rate at which the control can change its value
        going down.
      </li>
      <li>
        Start %: Control value which will be used to kickstart the control from
        a stop.
      </li>
      <li>Stop %: Control value below which the control will snap to 0%.</li>
      <li>Offset %: Offset applied to the assigned fan curve.</li>
      <li>Minimum %: Hard limit set where the control won't ever go below.</li>
    </ul>
  </Border>
);

export const curvesAndManualControl: DocSection = {
  key: "Curves and manual control",
  icon: icons.control,
  render: () => curvesAndManualControlText
};

export const speedPairing: DocSection = {
  key: "Speed sensor pairing",
  icon: icons.pairing,
  render: () => {
    return speedPairingText;
  }
};

export const calibration: DocSection = {
  key: "Calibration",
  icon: icons.calibration,
  render: () => {
    return (
      <div>
        {calibrationText}
        {parameters}
      </div>
    );
  }
};
