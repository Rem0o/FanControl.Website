import { useRef, useState } from "react";
import consts from "../common/consts";
import { icons } from "../common/icons";
import { NiceHeader } from "../reactComponents/niceHeader";
import { useRefreshState } from "../common/hooks";
import { ExternalLink, TrackedExternalLink } from "../reactComponents/links";
import { SpinningLogo } from "../reactComponents/spinningLogo";
import { ArticleReference } from "../reactComponents/articles/articlesReference";
import { articles } from "../reactComponents/articles/articles";
import { DonationModal } from "../reactComponents/donationModal";
import { DownloadModal } from "../reactComponents/downloadModal";
import { FeatureCard } from "../reactComponents/featureCard";
import { GradientButton } from "../reactComponents/gradientButton";
import { DownloadButton } from "../reactComponents/downloadButton";
import { GithubButton } from "../reactComponents/githubButton";
import { DemoMixFanCurveCard } from "../reactComponents/demo/demoMixFanCurveCard";
import { versionInfo } from "../reactComponents/services/versionService";
import Border from "../reactComponents/border";
import Card from "../reactComponents/card";
import { Icon } from "../reactComponents/icon";

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
    <div className="mt-20 flex flex-col place-items-center gap-16 text-center">
      {/* Hero Section with modern design */}
      <div className="relative animate-fade-in-down">
        <div className="bg-linear-to-r absolute inset-0 -z-10 animate-glow from-primary-600/20 to-accent/20 blur-3xl"></div>
        <SpinningLogo className="h-40 w-40 drop-shadow-2xl" spinInitially={true} />
      </div>
      
      <div className="max-w-4xl animate-fade-in-up space-y-6">
        <h1 className="mx-5 text-5xl font-bold leading-tight md:text-6xl">
          <span className="text-primary-700 dark:text-primary-400">
            Fan Control
          </span>
          <br />
          <span className="text-3xl font-semibold text-body-800 dark:text-body-200 md:text-4xl">
            Highly focused fan control for Windows
          </span>
        </h1>
        
        <div className="mx-5 space-y-3 text-xl text-body-700 dark:text-body-300 md:text-2xl">
          <p className="flex items-center justify-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="font-medium">No installation required</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-medium">Low on resources, high on power</span>
          </p>
        </div>
      </div>

      <div className="animate-fade-in">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <GithubButton />
          <DownloadButton
            version={versionInfo.Number}
            onClick={() => setShowDownloadModal(true)}
          />
        </div>
      </div>

      <Card className="border-body-300/50 dark:border-body-700/50 m-5 animate-scale-in overflow-hidden border-2 p-0 shadow-2xl">
        <img
          className="rounded-xl"
          width={1037}
          src="assets/main.png"
          alt="Main interface"
        />
      </Card>

      <section className="mx-5 animate-fade-in">
        <Border className="glass backdrop-blur-lg">
          <p className="flex max-w-2xl justify-center px-4 text-lg italic leading-relaxed md:text-xl">
            "No third-party software, at all, as much as they might want to
            tout that they do, {"[has]"} this level of control. This is what
            happens when someone that sees a problem, is an enthusiast, and is a
            programmer, gets involved and says I'm gonna do something that
            nobody has been doing a way I feel they should do it, and they did
            it right in my opinion."
          </p>
          <p className="mx-5 text-right">
            <TrackedExternalLink
              href={consts.urls.videoUrl}
              className="font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              — JayzTwoCents
            </TrackedExternalLink>
          </p>
        </Border>
      </section>

      <section className="bg-linear-to-br w-full animate-fade-in from-body-100 via-body-200 to-body-100 px-5 py-12 dark:from-body-900 dark:via-body-950 dark:to-body-900">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [icons.bulb, "Flexible by design"],
            [icons.graph, "7 Fan Curve types"],
            [icons.save, "Create multiple configurations"],
            [icons.brush, "UI Themes"],
            [icons.wrench, "Assisted setup"],
            [icons.temperature, "Temperature Tray Icons"]
          ].map(([icon, text, onClick], i) => (
            <div key={i} className="mx-auto transform transition-all duration-300 hover:scale-105">
              <Card className="bg-linear-to-br group border-0 from-primary-600 to-primary-700 text-white shadow-glow hover:shadow-glow-lg">
                <div className="flex items-center justify-center gap-3 p-2">
                  <div className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon icon={icon}/>
                  </div>
                  <div className="text-base font-semibold">{text}</div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap mx-5 my-12 grid animate-fade-in justify-center gap-10 text-left sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard>
          <NiceHeader
            text="CPU, GPU, and case fans"
            icon={icons.check}
          ></NiceHeader>
          <p className="leading-relaxed text-body-700 dark:text-body-300">
            Yup, that's covered. Fan Control has extensive support for a variety
            of motherboards, GPUs, and other hardware, like AIOs. Say goodbye to
            the "silo" approach of using multiple softwares to control your
            different fans. Have all of them controlled by a single smart
            entity, and start thinking about cooling and noise as a system-wide
            concern.
          </p>
        </FeatureCard>

        <FeatureCard>
          <NiceHeader
            text="Tinkerers rejoice"
            icon={icons.parameters}
          ></NiceHeader>
          <p className="leading-relaxed text-body-700 dark:text-body-300">
            Fan Control has ALL the parameters. Fan calibration, response time,
            hysteresis, hysteresis direction, step up, step down... Fine tune to
            your heart's desire. Control your fan's start and stopping logic,
            for smooth 0 RPM operation <i>(when supported)</i>.
          </p>
        </FeatureCard>

        <FeatureCard className="md:col-span-2 lg:col-span-1">
          <NiceHeader
            text="It's all about the mix"
            icon={icons.mix}
          ></NiceHeader>
          <p className="leading-relaxed text-body-700 dark:text-body-300">
            THE missing feature that originates this whole project. Mix fan
            curves take the possibilities to a whole new level. Combine any
            amount of fan curves together and apply a function like maximum or
            average to create a whole new control logic. Different curves bound
            to different temperature sensors, mixed together, your case fans
            never asked for better.
          </p>
          <GradientButton
            onClick={() => tryItOut(true)}
            onMouseEnter={() => tryItOut(false)}
            className="mt-4"
          >
            Try it out on the demo card! 🎯
          </GradientButton>
        </FeatureCard>

        <div className="m-auto w-fit animate-fade-in" ref={demoRef}>
          <DemoMixFanCurveCard refreshId={animationRefreshId} />
        </div>

        <FeatureCard>
          <NiceHeader
            text="Expansion through plugins"
            icon={icons.plugin}
          ></NiceHeader>
          <p className="leading-relaxed text-body-700 dark:text-body-300">
            Want to add more sensors and controls from a third party? No
            problem! Fan Control has a simple{" "}
            <TrackedExternalLink 
              href={consts.urls.pluginWikiUrl}
              className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              plugin system
            </TrackedExternalLink>{" "}
            with .NET that allow any third party developer to add temperature,
            speed or control sensors. Installing is as easy as dropping a dll in
            the plugin folder, that's it. You can checkout the list of active
            plugins on the{" "}
            <TrackedExternalLink 
              href={consts.urls.pluginListUrl}
              className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Github page
            </TrackedExternalLink>
            .
          </p>
        </FeatureCard>

        <FeatureCard>
          <NiceHeader
            text="Open source backend"
            icon={icons.github}
          ></NiceHeader>
          <p className="leading-relaxed text-body-700 dark:text-body-300">
            Fan Control backend is mainly based on{" "}
            <ExternalLink 
              href={consts.urls.lhmGithubPageUrl}
              className="font-medium text-primary-600 underline underline-offset-2 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              LibreHardwareMonitor
            </ExternalLink>
            , an open source fork of the original OpenHardwareMonitor. This
            means that hardware compatiblity is entirely open for anyone to
            contribute, and doesn't rely on a single developer or company who
            may stop caring at some point. Combined with the plugin system, Fan
            Control is unlocked for many generations of hardware to come.
          </p>
        </FeatureCard>
      </section>

      <section className="mx-5 mb-16 animate-fade-in">
        <div className="mb-10 mt-10 text-4xl font-bold text-body-800 dark:text-body-200">
          Featured articles
        </div>
        <div className="flex flex-wrap items-center space-x-5 space-y-5 align-text-top">
          {articles.map((article) => {
            const {imageAssetPath, href: url, imageClassNames} = article;
            return ArticleReference(imageAssetPath, url, imageClassNames);
          })}
        </div>
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
