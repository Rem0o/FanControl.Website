import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Card from "../components/card";
import Description from "../contents/description.mdx";
import { StaticImage } from "gatsby-plugin-image";
import icons from "./../contents/icons";

const pageTitle = "Home";

const IndexPage = () => {
  return (
    <Layout pageTitle={pageTitle}>
      <div className="flex flex-col place-items-center text-center gap-5">
        {/*icon*/}
        <svg className="hover:animate-spin h-36 w-36" viewBox="0 0 24 24">
          <path fill="currentColor" d={icons.svgPaths.fan} />
        </svg>
        <h1 className="text-4xl max-w-lg font-semibold mb-10">
          Fan Control is a highly focused fan controlling software for windows.
        </h1>
        <div className="text-lg mb-10 ">
          <Description />
        </div>
        <StaticImage
          width={800}
          src="./../images/main.png"
          alt="Main interface"
        ></StaticImage>

        <div className="grid grid-cols-2 gap-5 mt-5">
          {[
            "As simple, or as complex of a config you can create. Start simple, then go crazy.",
            "Multiple type of fan curves and custom sensors to choose from. Mix multiple togethers for infinite possibilities.",
            "Save, edit and load multiple configurations.",
            "Customize the look of the software to fit your theme.",
          ].map((t) => (
            <div className="max-w-xs">
              <Card>{t}</Card>
            </div>
          ))}
        </div>

        <div className="flex w-full">
          <h1 className=" flex justify-center items-center m-1">
            <svg className="h-12 w-12" viewBox="0 0 24 24">
              <path fill="currentColor" d={icons.svgPaths.mix} />
            </svg>
            <span className="ml-5 text-2xl font-semibold">
              It's all about the mix
            </span>
          </h1>
        </div>
        <p>Some mix description stuff...</p>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>{pageTitle}</title>;
