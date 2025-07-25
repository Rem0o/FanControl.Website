import type { SvgIcon } from "../common/icons";
import { BigIcon, Icon } from "./icon";

const NiceHeader = ({ icon, text }: { icon?: SvgIcon; text: string }) => {
  return (
    <h2 className="mb-2 flex items-center text-left">
      {icon ? BigIcon( {icon: icon, className: "mr-5"}) : <></>}

      <span className="align-middle text-xl font-medium">{text}</span>
    </h2>
  );
};

const NiceSmallerHeader = ({
  icon,
  text
}: {
  icon?: SvgIcon;
  text: string;
}) => {
  return (
    <h3 className="mb-2 flex items-center text-left">
      {icon ? BigIcon({ icon: icon, className: "mr-5"}) : <></>}

      <span className="align-middle text-lg font-medium">{text}</span>
    </h3>
  );
};

export { NiceHeader, NiceSmallerHeader };
