import React, { useRef, useState, type JSX } from "react";
import { twMerge } from "tailwind-merge";
import {
  mixSensor,
  timeAverage,
  fileSensor,
  offsetSensor
} from "../reactComponents/docs/customSensors";
import type { DocSection } from "../reactComponents/docs/docSection";
import {
  graph,
  linear,
  mix,
  trigger,
  flat,
  sync,
  auto,
  rpmMode
} from "../reactComponents/docs/fanCurves";
import { SmallIcon } from "../reactComponents/icon";
import { NiceHeader } from "../reactComponents/niceHeader";
import "./../styles/docs.css";
import { PageHeader } from "../reactComponents/pageHeader";
import { calibration, curvesAndManualControl, speedPairing } from "../reactComponents/docs/control";
import { amd, nvidia } from "../reactComponents/docs/gpu";

const c: DocSection = {
  key: "-c --config",
  render: () => {
    return (
      <div>
        <div>Usage: FanControl.exe -c yourConfig.json</div>
        <div>
          Start using the specified config, or change the config if the software
          is already running.
        </div>
      </div>
    );
  }
};

const w: DocSection = {
  key: "-w --window",
  render: () => {
    return <>Force the UI window to open, override the minimize option.</>;
  }
};

const m: DocSection = {
  key: "-m --minimized",
  render: () => {
    return (
      <>
        Force the program to be minimized, even if an error occurred at launch.
      </>
    );
  }
};

const r: DocSection = {
  key: "-r --refresh",
  render: () => {
    return <>Force the program to refresh its sensors.</>;
  }
};

const e: DocSection = {
  key: "-e --exit",
  render: () => {
    return <>Force the currently running instance to exit.</>;
  }
};

const controlSections: DocSection[] = [curvesAndManualControl, speedPairing, calibration];

const gpuSections: DocSection[] = [nvidia, amd];

const fanCurveSections: DocSection[] = [
  rpmMode,
  linear,
  graph,
  mix,
  trigger,
  flat,
  sync,
  auto
];

const customSensorSections: DocSection[] = [
  timeAverage,
  mixSensor,
  fileSensor,
  offsetSensor
];

const commandLineArgumentSections: DocSection[] = [c, w, m, r, e];

const ScrollToSection = (
  refs: React.RefObject<Map<string, HTMLElement | null>>,
  key: string
) => {
  const htmlItem = refs.current.get(key);
  if (htmlItem) {
    const top = htmlItem.getBoundingClientRect().top + window.pageYOffset - 75;
    window.scrollTo({ top: top, behavior: "smooth" });
  }
};

const SideBarDocSection = (section: DocSection, onClick: () => void) => {
  return (
    <li
      key={section.key}
      className="cursor-pointer rounded p-1 hover:bg-body-200 dark:hover:bg-body-700"
      onClick={() => onClick()}
    >
      <div className="flex items-center">
        {section.icon ? SmallIcon({icon: section.icon}) : ""}
        <span className="ml-2 align-middle">{section.key}</span>
      </div>
    </li>
  );
};

const DocSectionComponent = (
  section: DocSection,
  refs: React.RefObject<Map<string, HTMLElement | null>>
): JSX.Element => (
  <div
    id={section.key}
    key={section.key}
    ref={(el) => {
      refs.current.set(section.key, el);
    }}
  >
    <NiceHeader icon={section.icon} text={section.key}></NiceHeader>
    {section.render()}
  </div>
);

const DocSidebarHeader = ({
  text,
  onClick
}: {
  text: string;
  onClick: Function;
}) => (
  <h3
    onClick={() => onClick()}
    className="mb-2 cursor-pointer rounded p-1 font-medium underline hover:bg-body-200 dark:hover:bg-body-700"
  >
    {text}
  </h3>
);

const DocHeader = ({
  text,
  refs
}: {
  refs: React.RefObject<Map<string, HTMLElement | null>>;
  text: string;
}) => {
  return (
    <h2
      ref={(el) => {
        refs.current.set(text, el);
      }}
      className="mx-auto self-center text-left text-3xl font-medium"
    >
      {text}
    </h2>
  );
};

export const DocsPage = () => {
  const refs = useRef(new Map<string, HTMLElement>());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex">
      {/* Hamburger button - visible on small screens when sidebar is closed */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className={twMerge(
          "fixed left-4 top-16 z-50 flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-body-300 p-2 shadow-lg transition-all hover:bg-body-400 dark:bg-body-800 dark:hover:bg-body-700 lg:hidden",
          mobileMenuOpen ? "hidden" : ""
        )}
        aria-label="Open menu"
      >
        <span className="mb-1 h-0.5 w-6 bg-body-900 dark:bg-body-100"></span>
        <span className="mb-1 h-0.5 w-6 bg-body-900 dark:bg-body-100"></span>
        <span className="h-0.5 w-6 bg-body-900 dark:bg-body-100"></span>
      </button>

      {/* Overlay - visible on small screens when menu is open */}
      <div
        className={twMerge(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Left column with elements */}
      <div
        className={twMerge(
          "w-fit overflow-y-auto border-r-2 border-body-200 bg-body-200 px-2 dark:border-body-700 dark:bg-body-950",
          // Desktop behavior - sticky sidebar
          "lg:sticky lg:top-[48px] lg:h-[96svh] lg:z-20",
          // Mobile behavior - fixed overlay that slides in
          "fixed left-0 top-0 z-50 h-screen pt-4 transition-transform",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="sticky mt-2 flex flex-col">
          {/* Close button inside sidebar - visible on small screens only */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="mb-4 flex h-10 w-10 items-center justify-center self-end rounded-lg bg-body-300 p-2 shadow-lg transition-all hover:bg-body-400 dark:bg-body-700 dark:hover:bg-body-600 lg:hidden"
            aria-label="Close menu"
          >
            <span className="absolute h-0.5 w-6 rotate-45 bg-body-900 dark:bg-body-100"></span>
            <span className="absolute h-0.5 w-6 -rotate-45 bg-body-900 dark:bg-body-100"></span>
          </button>

          <DocSidebarHeader
            text="Control"
            onClick={() => {
              ScrollToSection(refs, "Control");
              setMobileMenuOpen(false);
            }}
          />

          <ul className="mb-5 mr-5">
            {controlSections.map((s) =>
              SideBarDocSection(s, () => {
                ScrollToSection(refs, s.key);
                setMobileMenuOpen(false);
              })
            )}
          </ul>

          <DocSidebarHeader
            text="GPU"
            onClick={() => {
              ScrollToSection(refs, "GPU");
              setMobileMenuOpen(false);
            }}
          />

          <ul className="mb-5 mr-5">
            {gpuSections.map((s) =>
              SideBarDocSection(s, () => {
                ScrollToSection(refs, s.key);
                setMobileMenuOpen(false);
              })
            )}
          </ul>

          <DocSidebarHeader
            text="Fan Curves"
            onClick={() => {
              ScrollToSection(refs, "Fan Curves");
              setMobileMenuOpen(false);
            }}
          />

          <ul className="mb-5 mr-5">
            {fanCurveSections.map((s) =>
              SideBarDocSection(s, () => {
                ScrollToSection(refs, s.key);
                setMobileMenuOpen(false);
              })
            )}
          </ul>

          <DocSidebarHeader
            text="Custom Sensors"
            onClick={() => {
              ScrollToSection(refs, "Custom Sensors");
              setMobileMenuOpen(false);
            }}
          />
          <ul className="mb-5 mr-5">
            {customSensorSections.map((s) =>
              SideBarDocSection(s, () => {
                ScrollToSection(refs, s.key);
                setMobileMenuOpen(false);
              })
            )}
          </ul>

          <DocSidebarHeader
            text="Command Line Arguments"
            onClick={() => {
              ScrollToSection(refs, "Command Line Arguments");
              setMobileMenuOpen(false);
            }}
          />
          <ul className="mb-5 mr-5">
            {commandLineArgumentSections.map((s) =>
              SideBarDocSection(s, () => {
                ScrollToSection(refs, s.key);
                setMobileMenuOpen(false);
              })
            )}
          </ul>
        </div>
      </div>

      {/* Main section with actual documentation */}
      <div className="docs mx-10 mb-5 mt-12">
        <div className="max-w-3xl space-y-16">
          <PageHeader children="Documentation" />

          <DocHeader text="Control" refs={refs} />
          {controlSections.map((s) => DocSectionComponent(s, refs))}

          <DocHeader text="GPU" refs={refs} />
          {gpuSections.map((s) => DocSectionComponent(s, refs))}

          <DocHeader text="Fan Curves" refs={refs} />
          {fanCurveSections.map((s) => DocSectionComponent(s, refs))}

          <DocHeader text="Custom Sensors" refs={refs} />
          {customSensorSections.map((s) => DocSectionComponent(s, refs))}

          <DocHeader text="Command Line Arguments" refs={refs} />
          {commandLineArgumentSections.map((s) => DocSectionComponent(s, refs))}
        </div>
      </div>
    </div>
  );
};
