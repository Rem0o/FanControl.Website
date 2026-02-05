import { icons } from "../common/icons";
import { IconButton } from "./iconButton";

interface DownloadButtonProps {
  version: number;
  onClick?: () => void;
}

/**
 * Styled download button with version number
 * Uses primary gradient colors
 */
export const DownloadButton = ({
  version,
  onClick
}: DownloadButtonProps) => {
  let text = "Download";
  if (version > 0) {
    text += " V" + version;
  }

  return (
    <IconButton
      className="bg-linear-to-r border-0 from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 hover:shadow-glow dark:from-primary-600 dark:to-primary-800 dark:hover:from-primary-700 dark:hover:to-primary-900"
      icon={icons.download}
      text={text}
      onClick={onClick}
    />
  );
};
