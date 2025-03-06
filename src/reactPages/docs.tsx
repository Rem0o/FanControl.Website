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
import { calibration, speedPairing } from "../reactComponents/docs/control";
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
        Force the program to be minimized, even if an error occured at launch.
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

const controlSections: DocSection[] = [speedPairing, calibration];

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
      className="cursor-pointer rounded p-1 hover:bg-body-200"
      onClick={() => onClick()}
    >
      <div className="flex items-center">
        {section.icon ? SmallIcon(section.icon) : ""}
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
    className="mb-2 cursor-pointer rounded p-1 font-medium underline hover:bg-body-200"
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
  const [v, setV] = useState(true);

  return (
    <div className="flex">
      <button
        onClick={() => setV(!v)}
        className="fixed left-5 top-12 hidden rounded-full bg-body-700 p-2 text-body-50"
      >
        {"<="}
      </button>
      {/* Left columm with elements */}
      <div
        className={twMerge(
          "sticky top-[40px] h-[96svh] w-fit overflow-y-auto border-r-2 border-body-200 bg-body-200 px-2 dark:border-body-700 dark:bg-body-950",
          v ? "" : "hidden"
        )}
      >
        <div className="sticky mt-6 flex flex-col">
          <DocSidebarHeader
            text="Control"
            onClick={() => ScrollToSection(refs, "Control")}
          />

          <ul className="mb-5 mr-5">
            {controlSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s.key))
            )}
          </ul>

          <DocSidebarHeader
            text="GPU"
            onClick={() => ScrollToSection(refs, "GPU")}
          />

          <ul className="mb-5 mr-5">
            {gpuSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s.key))
            )}
          </ul>

          <DocSidebarHeader
            text="Fan Curves"
            onClick={() => ScrollToSection(refs, "Fan Curves")}
          />

          <ul className="mb-5 mr-5">
            {fanCurveSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s.key))
            )}
          </ul>

          <DocSidebarHeader
            text="Custom Sensors"
            onClick={() => ScrollToSection(refs, "Custom Sensors")}
          />
          <ul className="mb-5 mr-5">
            {customSensorSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s.key))
            )}
          </ul>

          <DocSidebarHeader
            text="Command Line Arguments"
            onClick={() => ScrollToSection(refs, "Command Line Arguments")}
          />
          <ul className="mb-5 mr-5">
            {commandLineArgumentSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s.key))
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
