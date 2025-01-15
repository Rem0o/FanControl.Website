import { ExternalLink } from "../reactComponents/links";
import consts from "../common/consts";
import { PageHeader } from "../reactComponents/pageHeader";
import Border from "../reactComponents/border";
import { NiceHeader } from "../reactComponents/niceHeader";
import { icons } from "../common/icons";

export const AboutPage = () => {
  return (
    <>
      <div className="flex ml-5 mt-12" >
        <PageHeader children="About" />
      </div>

      <div className="flex flex-wrap gap-4 p-5">
        <Border className="max-w-xl">
          <NiceHeader text="Powered by:" icon={icons.github} />
          <ul className="ml-5 mt-5 list-disc">
            {[
              consts.urls.lhmGithubPageUrl,
              "https://github.com/falahati/NvAPIWrapper",
              "https://github.com/Rem0o/ADLXWrapper",
              "https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit"
            ].map((x, i) => (
              <li key={i} className="break-words">
                <ExternalLink href={x}>{x}</ExternalLink>
              </li>
            ))}
          </ul>
        </Border>
      </div>
    </>
  );
};
