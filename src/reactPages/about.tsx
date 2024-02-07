import Card from "../reactComponents/card";
import { ExternalLink } from "../reactComponents/links";
import consts from "../common/consts";
import { PageHeader } from "../reactComponents/pageHeader";

const cardStyle = "bg-white gap-y-2 max-w-full";

export const AboutPage = () => {
  return (
    <>
      <div className="ml-5">
        <PageHeader children="About" />
      </div>

      <div className="flex flex-wrap gap-4 p-5">
        <Card className={cardStyle}>
          <div className="text-xl font-medium">Powered by:</div>
          <ul className="ml-5 list-disc">
            {[
              consts.urls.lhmGithubPageUrl,
              "https://github.com/falahati/NvAPIWrapper",
              "https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit"
            ].map((x, i) => (
              <li key={i} className="break-words">
                <ExternalLink href={x}>{x}</ExternalLink>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
};
