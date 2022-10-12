import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Card from "../components/card";
import ControlCard from "../components/demo/controlCard";

const pageTitle = "About";

const AboutPage = () => {
  return (
    <Layout pageTitle={pageTitle}>
      <div className="flex space-x-4">
        <Card>
          Created and designed by Rémi Mercier.
          <br />
          remi.mercier.software@gmail.com
          <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=N4JPSTUQHRJM8&currency_code=USD&source=url&item_name=Fan+Control">
            <img src="https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat&logo=paypal"></img>
          </a>
        </Card>

        <Card>
          <div>Powered by:</div>
          {[
            "https://github.com/LibreHardwareMonitor/LibreHardwareMonitor",
            "https://github.com/falahati/NvAPIWrapper",
            "https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit",
          ].map((x) => (
            <div>{x}</div>
          ))}
        </Card>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>{pageTitle}</title>;
