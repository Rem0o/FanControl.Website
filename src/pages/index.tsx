import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Card from "../components/card";
import Description from "../contents/description.mdx";
import { StaticImage } from "gatsby-plugin-image";
import icons from "./../contents/icons";
import { BigIcon, Icon } from "./../components/icon";
import consts from "../contents/consts";
import { useEffect, useState } from "react";
import { useInterval, useTimeoutBooleanState } from "../utilities/customHooks";
import MixFanCurveCard from "../components/demo/mixFanCurveCard";
import {
  createTempSource,
  createTempSourceRandom,
  TemperatureSource,
} from "../components/demo/temperatureSource";
import { FanCurve } from "../components/demo/fanCurve";
import { ExternalLink, TrackedExternalLink } from "../components/externalLink";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import NiceHeader from "../components/niceHeader";
import { SEO } from "../components/seo";
import { useInView } from "react-intersection-observer";

const pageTitle = "Fan Control";

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
      <div className={`flex w-40 gap-2 ${textColor}`}>
        {Icon(icon)}
        <span className="m-auto">{text}</span>
      </div>
    </Card>
  </button>
);

const DownloadButton = () => {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    fetch(consts.urls.versionJsonUrl)
      .then((r) => r.json())
      .then((json) => setVersion(json.Number));
  }, []);

  let text = "Download";
  if (version > 0) {
    text += " V" + version;
  }

  return (
    <OutboundLink href={consts.urls.directDownloadUrl}>
      <IconButton
        background="bg-primary-800 hover:bg-primary-600"
        icon={icons.svgPaths.download}
        textColor="text-white"
        text={text}
      />
    </OutboundLink>
  );
};

const GithubButton = () => {
  return (
    <OutboundLink href={consts.urls.githubPageUrl}>
      <IconButton
        background="bg-gray-300 hover:bg-gray-400"
        icon={icons.svgPaths.github}
        textColor="text-black"
        text="GitHub Page"
      />
    </OutboundLink>
  );
};

const DemoMixFanCurveCard = () => {
  const updateSources = (): [
    TemperatureSource,
    TemperatureSource,
    TemperatureSource
  ] => [
    createTempSourceRandom("a", 40, 60),
    createTempSourceRandom("b", 30, 70),
    createTempSourceRandom("c", 26, 65),
  ];

  const [sources, setSources] = useState([
    createTempSource("a", 50),
    createTempSource("b", 50),
    createTempSource("c", 50),
  ]);

  useInterval(1000, () => {
    setSources(updateSources());
  });

  // we mock random fan curves that outputs the temperature source as the %
  const mockedFanCurves: FanCurve[] = [
    { name: "CPU -> Case fans", getValue: () => sources[0].value },
    { name: "GPU -> Case fans", getValue: () => sources[1].value },
    { name: "SSD -> Case fans", getValue: () => sources[2].value },
  ];

  return (
    <MixFanCurveCard
      name="Demo Case Fans"
      fanCurves={mockedFanCurves}
      selectedFanCurvesDefault={mockedFanCurves.slice(0, 1).map((x) => x.name)}
    ></MixFanCurveCard>
  );
};

const IndexPage = () => {
  const [isSpinning, setIsSpinning] = useTimeoutBooleanState(true, 3000);
  const { ref: demoRef, inView: demoInView } = useInView({
    threshold: 0,
    rootMargin: "100px",
    delay: 500,
  });

  return (
    <Layout>
      <div className="flex flex-col place-items-center gap-12 text-center">
        <svg
          onMouseEnter={() => setIsSpinning(true)}
          className={`${
            isSpinning ? "animate-spin" : ""
          } mt-10 h-36 w-36 hover:animate-spin`}
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d={icons.svgPaths.fan} />
        </svg>
        <h1 className="max-w-lg text-4xl font-bold">
          Fan Control is a highly focused fan controlling software for Windows.
        </h1>
        <div className="text-2xl">
          <p>No installation required.</p>
          <br />
          <p>Low on ressources, high on power.</p>
        </div>

        <div className="flex gap-6">
          <GithubButton />
          <DownloadButton />
        </div>

        <Card className="m-5 p-0">
          <StaticImage
            className="rounded"
            width={1037}
            src="./../images/main.png"
            alt="Main interface"
          ></StaticImage>
        </Card>

        <section className="my-10 max-w-xl text-xl italic">
          " No third-party software, at all, as much as they might want to tout
          that they do, do not have this level of control. This is what happens
          when someone that sees a problem, is an enthusiast, and is a
          programmer, gets involved and says I'm gonna do something that nobody
          has been doing a way I feel they should do it, and they did it right
          in my opinion. " <br /> <br /> - <ExternalLink href={consts.urls.videoUrl}>JayzTwoCents</ExternalLink>
        </section>

        <section className="my-10 w-full bg-body-200 px-5 py-20">
          <div className="wrap mx-auto flex max-w-5xl flex-wrap place-content-center content-evenly gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {[
              [icons.svgPaths.bulb, "Flexible by design"],
              [icons.svgPaths.graph, "7 Fan Curve types"],
              [icons.svgPaths.save, "Create multiple configurations"],
              [icons.svgPaths.brush, "UI Themes"],
              [icons.svgPaths.wrench, "Assisted setup"],
              [icons.svgPaths.temperature, "Temperature Tray Icon"],
            ].map(([icon, text], i) => (
              <div key={i} className="m-auto flex items-center">
                <Card className=" bg-body-700 text-body-300">
                  <div className="h-18 justify-left flex w-52 items-center text-center">
                    <div className="mr-2">{BigIcon(icon)}</div>
                    <div className="mx-auto">{text}</div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap my-10 mx-5 grid justify-center gap-20 text-left sm:grid-cols-1 md:grid-cols-2">
          <div className="max-w-sm">
            <NiceHeader
              text="CPU, GPU, and case fans"
              icon={icons.svgPaths.check}
            ></NiceHeader>
            <p>
              Yup, that's covered. Fan Control has extensive support for a
              variety of motherboards, GPUs, and other hardware, like AIOs. Say
              goodbye to the "silo" approach of using multiple softwares to
              control your different fans. Have all your them controlled by a
              single smart entity, and start thinking about cooling and noise as
              a system-wide concern.
            </p>
          </div>

          <div className="max-w-sm">
            <NiceHeader
              text="Tinkerers rejoice"
              icon={icons.svgPaths.parameters}
            ></NiceHeader>
            <p>
              Fan Control has ALL the parameters. Response time, hysteresis,
              hysteresis direction, step up, step down... Fine tune to your
              heart's desire. Control your fan's start and stopping logic, for
              smooth 0 RPM operation <i>(when supported)</i>.
            </p>
          </div>

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
          <div
            className={"m-auto " + (demoInView ? "animate-wiggle" : "")}
            ref={demoRef}
          >
            <DemoMixFanCurveCard />
          </div>

          <div className="max-w-sm">
            <NiceHeader
              text="Expansion through plugins"
              icon={icons.svgPaths.plugin}
            ></NiceHeader>
            <p>
              Want to add more sensors and controls from a third party? No
              problem! Fan Control has a simple{" "}
              <TrackedExternalLink href={consts.urls.pluginUrl}>
                plugin
              </TrackedExternalLink>{" "}
              system with .NET that allow any third party developer to add
              temperature, speed or control sensors. Installing is as easy as
              dropping a dll in the plugin folder, that's it.
            </p>
          </div>

          <div className="max-w-sm">
            <NiceHeader
              text="Open source backend"
              icon={icons.svgPaths.backend}
            ></NiceHeader>
            <p>
              Fan Control backend is mainly based on{" "}
              <ExternalLink href={consts.urls.lhmGithubPageUrl}>
                LibreHardwareMonitor
              </ExternalLink>
              , an open source fork of the original OpenHardwareMonitor. This
              means that hardware compatiblity is entierely open for anyone to
              contribute, and doesn't rely on a single developer which may stop
              caring at some point. Combined with the plugin system, Fan Control
              is unlocked for many generations of hardware to come.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO pathname={pageTitle} title={pageTitle}></SEO>
);
