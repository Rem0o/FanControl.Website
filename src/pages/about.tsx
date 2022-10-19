import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Card from "../components/card";
import ControlCard from "../components/demo/controlCard";
import { Icon } from "../components/icon";
import icons from "../contents/icons";

const pageTitle = "About";

const cardStyle = "bg-white gap-y-2";
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
            <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=N4JPSTUQHRJM8&currency_code=USD&source=url&item_name=Fan+Control">
              <img src="https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat&logo=paypal"></img>
            </a>
          </div>
        </Card>

        <Card className={cardStyle}>
          <div className="text-xl font-medium">Powered by:</div>
          <ul className="list-disc ml-5">
            {[
              "https://github.com/LibreHardwareMonitor/LibreHardwareMonitor",
              "https://github.com/falahati/NvAPIWrapper",
              "https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit",
            ].map((x, i) => (
              <li key={i}>
                <a href={x}>{x}</a>
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
