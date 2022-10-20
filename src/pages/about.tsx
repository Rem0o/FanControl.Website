import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Card from "../components/card";
import { Icon } from "../components/icon";
import icons from "../contents/icons";
import consts from "../contents/consts";
import ExternalLink from "../components/externalLink";

const pageTitle = "About";

const cardStyle = "bg-white gap-y-2 max-w-sm sm:max-w-2xl";
const headerStyle = "text-xl font-medium";

const AboutPage = () => {
  return (
    <Layout pageTitle={pageTitle}>
      <div className="flex gap-4 flex-wrap">
        <Card className={cardStyle}>
          <div className={headerStyle}>Created and designed by:</div>
          <div className="flex align-middle items-center">
            {Icon(icons.svgPaths.user)}
            <span className="ml-2">Rémi Mercier</span>
          </div>
          <div className="flex align-middle items-center">
            {Icon(icons.svgPaths.mail)}
            <span className="ml-2">remi.mercier.software@gmail.com</span>
          </div>
          <div>
            <a href={consts.urls.donationUrl}>
              <img src="https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat&logo=paypal"></img>
            </a>
          </div>
        </Card>

        <Card className={cardStyle}>
          <div className="text-xl font-medium">Powered by:</div>
          <ul className="list-disc ml-5">
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
