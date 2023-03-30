import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Card from "../components/card";
import {
  mixSensor,
  timeAverage,
  fileSensor,
  offsetSensor
} from "../components/docs/customSensors";
import type { DocSection } from "../components/docs/docSection";
import {
  graph,
  linear,
  mix,
  trigger,
  flat,
  sync,
} from "../components/docs/fanCurves";
import { SmallIcon } from "../components/icon";
import NiceHeader from "../components/niceHeader";
import "./../styles/docs.css";

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
  },
};

const w: DocSection = {
  key: "-w",
  render: () => {
    return <>Force the UI window to open, override the minimize option.</>;
  },
};

const m: DocSection = {
  key: "-m",
  render: () => {
    return <>Force the program to be minimized, even if an error occured at launch.</>;
  },
};


const fanCurveSections: DocSection[] = [
  linear,
  graph,
  mix,
  trigger,
  flat,
  sync,
];

const customSensorSections: DocSection[] = [timeAverage, mixSensor, fileSensor, offsetSensor];

const commandLineArgumentSections: DocSection[] = [c, w, m];

const ScrollToSection = (
  refs: React.MutableRefObject<Map<string, HTMLElement | null>>,
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
  refs: React.MutableRefObject<Map<string, HTMLElement | null>>
): JSX.Element => (
  <div id={section.key} key={section.key} ref={(el) => refs.current.set(section.key, el)}>
    <NiceHeader icon={section.icon} text={section.key}></NiceHeader>
    {section.render()}
  </div>
);

const DocSidebarHeader = ({
  text,
  onClick,
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
  refs,
}: {
  refs: React.MutableRefObject<Map<string, HTMLElement | null>>;
  text: string;
}) => {
  return (
    <h2
      ref={(el) => refs.current.set(text, el)}
      className="mx-auto self-center text-left text-4xl font-semibold underline"
    >
      {text}
    </h2>
  );
};

export const DocsPage = () => {
  const refs = useRef<Map<string, HTMLElement | null>>(
    new Map<string, HTMLElement | null>()
  );
  const [v, setV] = useState(true);
  
  return (
   
    <div className="flex px-5 pb-5">
      <button onClick={() => setV(!v)} className="hidden fixed rounded-full p-2 bg-body-700 text-body-50 top-12 left-5">{"<="}</button>
      {/* Left columm with elements */}
      <div className={twMerge("w-fit border-r-2 border-body-200 pr-5", v ? "" : "hidden")}>
        <div className="sticky top-20 flex flex-col ">
          <DocSidebarHeader
            text="Fan Curves"
            onClick={() => ScrollToSection(refs, "Fan Curves")}
          />

          <ul className="mr-5 mb-5">
            {fanCurveSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s.key))
            )}
          </ul>

          <DocSidebarHeader
            text="Custom Sensors"
            onClick={() => ScrollToSection(refs, "Custom Sensors")}
          />
          <ul className="mr-5 mb-5">
            {customSensorSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s.key))
            )}
          </ul>

          <DocSidebarHeader
            text="Command Line Arguments"
            onClick={() => ScrollToSection(refs, "Command Line Arguments")}
          />
          <ul className="mr-5 mb-5">
            {commandLineArgumentSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s.key))
            )}
          </ul>
        </div>
      </div>
      {/* Main section with actual documentation */}
      <div className="docs ml-5">
        <div className="max-w-3xl space-y-16">
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
