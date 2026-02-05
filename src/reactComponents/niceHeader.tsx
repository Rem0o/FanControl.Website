import type { SvgIcon } from "../common/icons";
import { BigIcon, Icon } from "./icon";

const NiceHeader = ({ icon, text }: { icon?: SvgIcon; text: string }) => {
  return (
    <h2 className="mb-4 flex items-center text-left group">
      {icon ? BigIcon( {icon: icon, className: "mr-4 text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:scale-110"}) : <></>}

      <span className="align-middle text-2xl font-bold bg-gradient-to-r from-body-800 to-body-600 dark:from-body-100 dark:to-body-300 bg-clip-text text-transparent">{text}</span>
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
    <h3 className="mb-3 flex items-center text-left group">
      {icon ? BigIcon({ icon: icon, className: "mr-3 text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:scale-110"}) : <></>}

      <span className="align-middle text-xl font-semibold text-body-800 dark:text-body-200">{text}</span>
    </h3>
  );
};

export { NiceHeader, NiceSmallerHeader };
