import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Card from "../components/card";
import { Icon } from "../components/icon";
import icons from "../contents/icons";
import consts from "../contents/consts";
import { ExternalLink } from "../components/externalLink";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const pageTitle = "About";
const cardStyle = "bg-white gap-y-2 max-w-sm sm:max-w-2xl";

const AboutPage = () => {
  return (
    <Layout pageTitle={pageTitle}>
      <div className="flex flex-wrap gap-4 p-5">
        <Card className={cardStyle}>
          <div className="text-xl font-medium">Powered by:</div>
          <ul className="ml-5 list-disc">
            {[
              consts.urls.lhmGithubPageUrl,
              "https://github.com/falahati/NvAPIWrapper",
              "https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit",
            ].map((x, i) => (
              <li key={i} className="break-words">
                <ExternalLink href={x}>{x}</ExternalLink>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>{pageTitle}</title>;
