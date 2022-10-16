import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Card from "../components/card";
import Description from "../contents/description.mdx";
import { StaticImage } from "gatsby-plugin-image";
import icons from "./../contents/icons";
import { Icon } from "./../components/icon"
import consts from "../contents/consts";
import { useEffect, useRef, useState } from "react";
import { useInterval, useTimeoutBooleanState } from "../hooks/customHooks";
import MixFanCurveCard from "../components/demo/mixFanCurveCard";
import createTempSource, { TemperatureSource } from "../components/demo/temperatureSource";
import { FanCurve } from "../components/demo/fanCurve";

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

const IconButton = ({
  background,
  textColor,
  text,
  icon,
  onClick,
}: {
  background: string;
  textColor: string;
  text: string;
  icon: string;
  onClick?: Function;
}) => (
  <button onClick={() => (onClick ? onClick() : null)}>
    <Card className={background}>
      <div className={`flex gap-2 w-36 ${textColor}`}>
        {Icon(icon)}
        <span className="m-auto">{text}</span>
      </div>
    </Card>
  </button>
);

const IndexPage = () => {
  const [isSpinning, setIsSpinning] = useTimeoutBooleanState(true, 3000);

  const getSources = () : [TemperatureSource, TemperatureSource, TemperatureSource] => [
    createTempSource("a", 40, 60),
    createTempSource("b", 30, 70),
    createTempSource("c", 26, 65)
  ];

  const [sources, setSources] = useState(getSources());
  
  useInterval(1000, () => {
    setSources(getSources());
  });

  // we mock random fan curves that outputs the temperature source as the %
  const mockedFanCurves: FanCurve[] = [
    { name: "CPU -> Case fans", getValue: () => sources[0].value },
    { name: "GPU -> Case fans", getValue: () => sources[1].value },
    { name: "SSD -> Case fans", getValue: () => sources[2].value },
  ];

  return (
    <Layout pageTitle={pageTitle}>
      <div className="flex flex-col place-items-center text-center gap-12">
        <svg
          onMouseEnter={() => setIsSpinning(true)}
          className={`${
            isSpinning ? "animate-spin" : ""
          } hover:animate-spin h-36 w-36`}
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d={icons.svgPaths.fan} />
        </svg>
        <h1 className="text-4xl max-w-lg font-semibold">
          Fan Control is a highly focused fan controlling software for windows.
        </h1>
        <div className="text-lg">
          <Description />
        </div>

        <div className="flex gap-6">
          <IconButton
            onClick={() => window.open(consts.urls.githubPageUrl)}
            background="bg-gray-300 hover:bg-gray-400"
            icon={icons.svgPaths.github}
            textColor="text-black"
            text="GitHub Page"
          />
          <IconButton
            onClick={() => window.open(consts.urls.directDownloadUrl)}
            background="bg-blue-500 hover:bg-blue-600"
            icon={icons.svgPaths.download}
            textColor="text-white"
            text="Download"
          />
        </div>

        <StaticImage
          width={800}
          src="./../images/main.png"
          alt="Main interface"
        ></StaticImage>

        <div>
          <div className="text-2xl font-semibold mb-4">Features rapid fire</div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 wrap">
            {[
              "Assisted setup will guide you through your initial config, so you can get to customizing curves right away.",
              "As simple, or as complex of a config you can create. Start simple, then go crazy.",
              "Multiple type of fan curves and custom sensors to choose from. Mix multiple togethers for infinite possibilities.",
              "Save, edit and load multiple configurations.",
              "Customize the look of the software to fit your theme.",
              "Use the tray icon as a temperature display.",
            ].map((t, i) => (
              <div key={i} className="max-w-xs">
                <Card className="bg-white">{t}</Card>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 wrap text-left justify-center">
          <div className="max-w-sm">
            <NiceHeader
              text="It's all about the mix"
              icon={icons.svgPaths.mix}
            ></NiceHeader>
            <p>
              THE missing function that originates this whole project. Mix fan
              curves take the possibilities to a whole new level. Combine any
              type of fan curves together and apply a function like maximum or
              average to create a whole new control logic. Different curves
              bound to different temperature sensors, mixed together, your case
              fans never asked for better. <br />
              <br /> <b>Try it out on the demo card!</b>
            </p>
          </div>
          <div className="m-auto">
            <MixFanCurveCard
              name="Demo Card"
              fanCurves={mockedFanCurves}
              selectedFanCurvesDefault={mockedFanCurves
                .slice(0, 2)
                .map((x) => x.name)}
            ></MixFanCurveCard>
          </div>

          <div className="max-w-sm">
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

          <div className="max-w-sm">
            <NiceHeader
              text="Open through plugins"
              icon={icons.svgPaths.plugin}
            ></NiceHeader>
            <p>
              Want to add more sensors and controls from a third party? No
              problem! Fan Control has a simple plugin system with .NET that
              allow any third party developper to add temperature, speed or
              control sensors. Installing is as easy as dropping a dll
              in the plugin folder, that's it.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>{pageTitle}</title>;
