import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Card from "../components/card";
import Description from "../contents/description.mdx";
import { StaticImage } from "gatsby-plugin-image";
import icons from "./../contents/icons";
import consts from "../contents/consts";

const pageTitle = "Home";

const NiceHeader = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <h1 className="flex m-1">
      <svg className="h-12 w-12" viewBox="0 0 24 24">
        <path fill="currentColor" d={icon} />
      </svg>
      <span className="ml-5 text-2xl font-semibold">{text}</span>
    </h1>
  );
};

const Icon = (path: string) => (
  <svg className="w-8 h-8" viewBox="0 0 24 24">
    <path fill="currentColor" d={path} />
  </svg>
);

const IconButton = ({
  background,
  textColor,
  text,
  icon,
  onClick
}: {
  background: string;
  textColor: string;
  text: string;
  icon: string;
  onClick?: Function
}) => (
  <button onClick={() => onClick ? onClick() : null}>
    <Card background={background}>
      <div className={`flex gap-2 w-36 ${textColor}`}>
        {Icon(icon)}
        <span className="m-auto">{text}</span>
      </div>
    </Card>
  </button>
);

const IndexPage = () => {
  return (
    <Layout pageTitle={pageTitle}>
      <div className="flex flex-col place-items-center text-center gap-12">
        
        <svg className="hover:animate-spin h-36 w-36" viewBox="0 0 24 24">
          <path fill="currentColor" d={icons.svgPaths.fan} />
        </svg>
        <h1 className="text-4xl max-w-lg font-semibold">
          Fan Control is a highly focused fan controlling software for windows.
        </h1>
        <div className="text-lg">
          <Description />
        </div>

        <div className="flex gap-6">
          <IconButton onClick={() => window.open(consts.urls.githubPageUrl)} background="bg-gray-300 hover:bg-gray-400" icon={icons.svgPaths.github} textColor="text-black" text="GitHub Page" />
          <IconButton onClick={() => window.open(consts.urls.directDownloadUrl)} background="bg-teal-500 hover:bg-teal-600" icon={icons.svgPaths.download} textColor="text-white" text="Download"/>
        </div>

        <StaticImage
          width={800}
          src="./../images/main.png"
          alt="Main interface"
        ></StaticImage>

        <div className="grid grid-cols-2 gap-5">
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

        <div className="flex flex-row w-full text-left gap-12">
          <div className="basis-1/2">
            <NiceHeader
              text="It's all about the mix"
              icon={icons.svgPaths.mix}
            ></NiceHeader>
            <p>
              THE missing function that originates this whole project. Mix fan
              curves take the possibilities to a whole other level. Combine any
              type of fan curves together and apply a function like maximum or
              average to create a whole new control logic. Different curves
              bound to different temperature sensors, your case fans never asked
              for better.
            </p>
          </div>

          <div className="basis-1/2">
            <NiceHeader
              text="Tinkerers rejoice"
              icon={icons.svgPaths.parameters}
            ></NiceHeader>
            <p>
              Fan Control has ALL the parameters. Response time, hysteresis,
              hysteresis direction, step up, step down... Fine tune to your
              hearth's desire. Control your fan's start and stopping logic, for
              smooth 0 RPM operation <i>(when supported)</i>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>{pageTitle}</title>;
