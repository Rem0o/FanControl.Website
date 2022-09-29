import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Card from "../components/card";
import Description from "../contents/description.mdx";
import { StaticImage } from "gatsby-plugin-image";

const pageTitle = "Home";

const IndexPage = () => {
  return (
    <Layout pageTitle={pageTitle}>
      <div className="flex flex-col place-items-center text-center gap-5">
        <div className="font-medium text-lg">
          <Description />
        </div>
        <StaticImage
        width={800}
          src="./../images/main.png"
          alt="Main interface"
        ></StaticImage>

        <div className="flex flex-row flex-wrap gap-5">
          {[
            "As simple, or as complex as you want it to be.",
            "Multiple type of fan curves to choose from.",
            "Save, edit and load multiple configurations.",
            "Customize the look of the software to fit your theme."
          ].map(t => <div className="max-w-xs"><Card>{t}</Card></div>)}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>{pageTitle}</title>;
