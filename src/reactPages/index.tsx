import { useEffect, useRef, useState } from "react";
import { InView } from "react-intersection-observer";
import consts from "../common/consts";
import { icons, type SvgIcon } from "../common/icons";
import { NiceHeader } from "../reactComponents/niceHeader";
import Card from "../reactComponents/card";
import { Icon } from "../reactComponents/icon";
import {
  useInterval,
  useRefreshState,
  useTimeoutBooleanState
} from "../common/hooks";
import {
  createTempSource,
  createTempSourceRandom,
  type TemperatureSource
} from "../reactComponents/demo/temperatureSource";
import type { FanCurve } from "../reactComponents/demo/fanCurve";
import MixFanCurveCard from "../reactComponents/demo/mixFanCurveCard";
import {
  ExternalLink,
  TrackedAnchor,
  TrackedExternalLink
} from "../reactComponents/links";
import { SpinningLogo } from "../reactComponents/spinningLogo";
import { ArticleReference } from "../reactComponents/articles/articlesReference";
import { articles } from "../reactComponents/articles/articles";
import { DonationModal } from "../reactComponents/donationModal";
import { DownloadModal } from "../reactComponents/downloadModal";

import { versionInfo } from "../reactComponents/services/versionService";
import Border from "../reactComponents/border";

const IconButton = ({
  className: className,
  text,
  icon,
  onClick
}: {
  className: string;
  text: string;
  icon: SvgIcon;
  onClick?: Function;
}) => (
  <button onClick={() => (onClick ? onClick() : null)}>
    <Card className={className}>
      <div className="flex w-44 gap-2">
        <Icon icon={icon}/>
        <span className="m-auto font-semibold">{text}</span>
      </div>
    </Card>
  </button>
);

const DownloadButton = ({
  version,
  onClick
}: {
  version: number;
  onClick?: Function;
}) => {
  let text = "Download";
  if (version > 0) {
    text += " V" + version;
  }

  return (
    <IconButton
      className="bg-primary-600 text-white hover:bg-primary-700 hover:text-accent dark:bg-primary-700 dark:hover:bg-primary-800"
      icon={icons.download}
      text={text}
      onClick={onClick}
    />
  );
};

const GithubButton = () => {
  return (
    <TrackedAnchor href={consts.urls.githubPageUrl}>
      <IconButton
        className="bg-gray-300 hover:bg-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        icon={icons.github}
        text="GitHub Page"
      />
    </TrackedAnchor>
  );
};

const DemoMixFanCurveCard = ({ refreshId: refresh }: { refreshId: number }) => {
  const updateSources = (): [
    TemperatureSource,
    TemperatureSource,
    TemperatureSource
  ] => [
    createTempSourceRandom("a", 40, 60),
    createTempSourceRandom("b", 30, 70),
    createTempSourceRandom("c", 26, 65)
  ];

  const [sources, setSources] = useState([
    createTempSource("a", 50),
    createTempSource("b", 50),
    createTempSource("c", 50)
  ]);

  useInterval(3000, () => {
    setSources(updateSources());
  });

  const [isWiggling, setIsWiggling] = useTimeoutBooleanState(false, 500);

  useEffect(() => {
    setIsWiggling(true);
  }, [refresh]);

  const onInViewChange = (inView: boolean, e: IntersectionObserverEntry) => {
    if (inView) {
      setIsWiggling(true);
    }
  };

  // we mock random fan curves that outputs the temperature source as the %
  const mockedFanCurves: FanCurve[] = [
    { name: "CPU -> Case fans", getValue: () => sources[0].value },
    { name: "GPU -> Case fans", getValue: () => sources[1].value },
    { name: "SSD -> Case fans", getValue: () => sources[2].value }
  ];

  return (
    <InView
      className={isWiggling ? "animate-wiggle" : ""}
      triggerOnce={true}
      delay={500}
      threshold={1}
      onChange={onInViewChange}
    >
      <MixFanCurveCard
        name="Demo Case Fans"
        fanCurves={mockedFanCurves}
        selectedFanCurvesDefault={mockedFanCurves
          .slice(0, 2)
          .map((x) => x.name)}
      ></MixFanCurveCard>
    </InView>
  );
};

export const IndexPage = () => {
  const [animationRefreshId, animateDemoCard] = useRefreshState();
  const demoRef = useRef<HTMLDivElement | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const tryItOut = (click: boolean) => {
    if (click && demoRef.current) {
      demoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }

    animateDemoCard();
  };

  return (
    <div className="mt-32 flex flex-col place-items-center gap-12 text-center">
      <SpinningLogo className="h-36 w-36" spinInitially={true} />
      <h1 className="mx-5 max-w-lg text-4xl font-extrabold">
        Fan Control is a highly focused fan controlling software for Windows
      </h1>
      <div className="mx-5 gap-1 text-2xl font-semibold text-body-700 dark:text-body-400">
        <p className="mb-5">No installation required.</p>
        <p>Low on resources, high on power.</p>
      </div>

      <div>
        <div className="flex flex-wrap justify-center gap-6">
          <GithubButton />
          <DownloadButton
            version={versionInfo.Number}
            onClick={() => setShowDownloadModal(true)}
          />
        </div>
      </div>

      <Card className="m-5 p-0 shadow-xl shadow-body-600">
        <img
          className="rounded"
          width={1037}
          src="assets/main.png"
          alt="Main interface"
        ></img>
      </Card>

      <section className="mx-5 mt-10">
        <Border>
          <p className="flex max-w-xl justify-center text-xl italic">
            " No third-party software, at all, as much as they might want to
            tout that they do, {"[has]"} this level of control. This is what
            happens when someone that sees a problem, is an enthusiast, and is a
            programmer, gets involved and says I'm gonna do something that
            nobody has been doing a way I feel they should do it, and they did
            it right in my opinion. "<br></br>
          </p>
          <p className="relative mx-5 mb-5">
            <TrackedExternalLink
              href={consts.urls.videoUrl}
              className="absolute right-0 top-0"
            >
              JayzTwoCents
            </TrackedExternalLink>
          </p>
        </Border>
      </section>

      <section className="mx-5">
        {/*Article references here!!!*/}
        <div className="mb-8 mt-16 align-middle text-3xl font-semibold">
          Featured articles
        </div>
        <div className="flex flex-wrap items-center space-x-5 space-y-5 align-text-top">
          {articles.map((article) => {
            const [imgSrc, href, style] = article;
            return ArticleReference(imgSrc, href, style);
          })}
        </div>
      </section>

      <section className="w-full bg-body-200 px-5 py-20 dark:bg-body-950">
        <div className="mx-auto grid max-w-xl grid-cols-4 gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {[
            [icons.bulb, "Flexible by design"],
            [icons.graph, "7 Fan Curve types"],
            [icons.save, "Create multiple configurations"],
            [icons.brush, "UI Themes"],
            [icons.wrench, "Assisted setup"],
            [icons.temperature, "Temperature Tray Icons"]
          ].map(([icon, text, onClick], i) => (
            <div key={i} className="mx-auto flex items-center">
              <Card className="bg-body-700 text-body-100 shadow-lg shadow-body-500 hover:animate-wiggle hover:bg-primary-700 hover:text-accent dark:bg-body-800 dark:text-body-50 dark:hover:bg-primary-800 dark:hover:text-accent">
                <div className="h-18 justify-left flex items-center text-center">
                  <div className="mr-2"><Icon icon={icon}/></div>
                  <div className="mx-auto">{text}</div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap mx-5 my-10 grid justify-center gap-10 text-left sm:grid-cols-1 md:grid-cols-2">
        <Border className="max-w-sm">
          <NiceHeader
            text="CPU, GPU, and case fans"
            icon={icons.check}
          ></NiceHeader>
          <p>
            Yup, that's covered. Fan Control has extensive support for a variety
            of motherboards, GPUs, and other hardware, like AIOs. Say goodbye to
            the "silo" approach of using multiple softwares to control your
            different fans. Have all of them controlled by a single smart
            entity, and start thinking about cooling and noise as a system-wide
            concern.
          </p>
        </Border>

        <Border className="max-w-sm">
          <NiceHeader
            text="Tinkerers rejoice"
            icon={icons.parameters}
          ></NiceHeader>
          <p>
            Fan Control has ALL the parameters. Fan calibration, response time,
            hysteresis, hysteresis direction, step up, step down... Fine tune to
            your heart's desire. Control your fan's start and stopping logic,
            for smooth 0 RPM operation <i>(when supported)</i>.
          </p>
        </Border>

        <Border className="max-w-sm">
          <NiceHeader
            text="It's all about the mix"
            icon={icons.mix}
          ></NiceHeader>
          <p className="">
            THE missing feature that originates this whole project. Mix fan
            curves take the possibilities to a whole new level. Combine any
            amount of fan curves together and apply a function like maximum or
            average to create a whole new control logic. Different curves bound
            to different temperature sensors, mixed together, your case fans
            never asked for better.
          </p>
          <p
            className="mt-3 cursor-pointer rounded border border-body-700 bg-body-200 p-1 text-center font-medium text-body-700 hover:border-primary-600 hover:text-primary-600 dark:border-body-800 dark:bg-body-800 dark:text-body-300 dark:hover:border-primary-400 dark:hover:text-primary-400"
            onClick={() => tryItOut(true)}
            onMouseEnter={() => tryItOut(false)}
          >
            Try it out on the demo card!
          </p>
        </Border>

        <div className="m-auto w-fit" ref={demoRef}>
          <DemoMixFanCurveCard refreshId={animationRefreshId} />
        </div>

        <Border className="max-w-sm">
          <NiceHeader
            text="Expansion through plugins"
            icon={icons.plugin}
          ></NiceHeader>
          <p>
            Want to add more sensors and controls from a third party? No
            problem! Fan Control has a simple{" "}
            <TrackedExternalLink href={consts.urls.pluginWikiUrl}>
              plugin system
            </TrackedExternalLink>{" "}
            with .NET that allow any third party developer to add temperature,
            speed or control sensors. Installing is as easy as dropping a dll in
            the plugin folder, that's it. You can checkout the list of active
            plugins on the{" "}
            <TrackedExternalLink href={consts.urls.pluginListUrl}>
              Github page
            </TrackedExternalLink>
            .
          </p>
        </Border>

        <Border className="max-w-sm">
          <NiceHeader
            text="Open source backend"
            icon={icons.github}
          ></NiceHeader>
          <p>
            Fan Control backend is mainly based on{" "}
            <ExternalLink href={consts.urls.lhmGithubPageUrl}>
              LibreHardwareMonitor
            </ExternalLink>
            , an open source fork of the original OpenHardwareMonitor. This
            means that hardware compatiblity is entirely open for anyone to
            contribute, and doesn't rely on a single developer or company who
            may stop caring at some point. Combined with the plugin system, Fan
            Control is unlocked for many generations of hardware to come.
          </p>
        </Border>
      </section>

      {showDonationModal ? (
        DonationModal(() => setShowDonationModal(false))
      ) : (
        <></>
      )}
      {showDownloadModal ? (
        DownloadModal({
          version: versionInfo.Number,
          exitModal: () => setShowDownloadModal(false),
          onDownload: () => {
            setShowDownloadModal(false);
            setShowDonationModal(true);
          }
        })
      ) : (
        <></>
      )}
    </div>
  );
};
