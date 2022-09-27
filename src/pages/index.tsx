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
        <div className="font-medium text-lg"><Description /></div>
        <StaticImage
          src="./../images/main.png"
          alt="Main interface"
        ></StaticImage>
        <Card>As simple, or as complex as you want it to be.</Card>
        <Card>Multiple type of fan curves to choose from </Card>
        <Card>Save, edit and load multiple configurations</Card>
        <Card>Customize the look of the software to fit your theme.</Card>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>{pageTitle}</title>;
