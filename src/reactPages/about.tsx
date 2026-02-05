import { ExternalLink } from "../reactComponents/links";
import consts from "../common/consts";
import { PageHeader } from "../reactComponents/pageHeader";
import Border from "../reactComponents/border";
import { NiceHeader } from "../reactComponents/niceHeader";
import { icons } from "../common/icons";

export const AboutPage = () => {
  return (
    <div className="animate-fade-in">
      <div className="ml-5 mt-12 flex">
        <PageHeader children="About" />
      </div>

      <div className="flex flex-wrap gap-6 p-5">
        <Border className="max-w-xl glass backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:shadow-glow">
          <NiceHeader text="Powered by:" icon={icons.github} />
          <ul className="ml-6 mt-5 space-y-3 list-disc text-body-700 dark:text-body-300">
            {[
              consts.urls.lhmGithubPageUrl,
              "https://github.com/falahati/NvAPIWrapper",
              "https://github.com/Rem0o/ADLXWrapper",
              "https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit"
            ].map((x, i) => (
              <li key={i} className="break-words">
                <ExternalLink 
                  href={x}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium underline underline-offset-2 transition-colors"
                >
                  {x}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </Border>
      </div>
    </div>
  );
};
