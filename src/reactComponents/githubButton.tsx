import consts from "../common/consts";
import { icons } from "../common/icons";
import { TrackedAnchor } from "./links";
import { IconButton } from "./iconButton";

/**
 * GitHub button that links to the repository
 * Uses gray gradient styling
 */
export const GithubButton = () => {
  return (
    <TrackedAnchor href={consts.urls.githubPageUrl}>
      <IconButton
        className="border-0 bg-gradient-to-r from-gray-200 to-gray-300 text-body-800 hover:from-gray-300 hover:to-gray-400 dark:from-gray-700 dark:to-gray-800 dark:text-gray-100 dark:hover:from-gray-600 dark:hover:to-gray-700"
        icon={icons.github}
        text="GitHub Page"
      />
    </TrackedAnchor>
  );
};
