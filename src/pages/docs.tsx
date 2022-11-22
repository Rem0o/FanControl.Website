import { HeadFC } from "gatsby";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { mixSensor, timeAverage, fileSensor } from "../components/docs/customSensors";
import { DocSection } from "../components/docs/docSection";
import {
  graph,
  linear,
  mix,
  trigger,
  flat,
  sync,
} from "../components/docs/fanCurves";
import { SmallIcon } from "../components/icon";
import Layout from "../components/layout";
import NiceHeader from "../components/niceHeader";
import { SEO } from "../components/seo";
import * as styles from "../styles/docs.module.css";

const pageTitle = "Docs";

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

const fanCurveSections: DocSection[] = [
  linear,
  graph,
  mix,
  trigger,
  flat,
  sync,
];

const customSensorSections: DocSection[] = [timeAverage, mixSensor, fileSensor];

const commandLineArgumentSections: DocSection[] = [c, w];

const ScrollToSection = (
  refs: React.MutableRefObject<Map<string, HTMLDivElement | null>>,
  section: DocSection
) => {
  const htmlItem = refs.current.get(section.key);
  if (htmlItem) {
    const top = htmlItem.getBoundingClientRect().top - 50;
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
        { section.icon ? SmallIcon(section.icon) : "" }
        <span className="ml-2 align-middle">{section.key}</span>
      </div>
    </li>
  );
};

const DocSectionComponent = (
  sections: DocSection,
  refs: React.MutableRefObject<Map<string, HTMLDivElement | null>>
): JSX.Element => (
  <div key={sections.key} ref={(el) => refs.current.set(sections.key, el)}>
    <NiceHeader icon={sections.icon} text={sections.key}></NiceHeader>
    {sections.render()}
  </div>
);

const DocSidebarHeader = ({ text }: { text: string }) => (
  <h3 className="mb-2 font-medium underline">{text}</h3>
);

const DocHeader = ({ text }: { text: string }) => {
  return (
    <h2 className="mx-auto self-center text-left text-4xl font-semibold">
      {text}
    </h2>
  );
};

const DocsPage = () => {
  const refs = useRef<Map<string, HTMLDivElement | null>>(
    new Map<string, HTMLDivElement | null>()
  );

  return (
    <Layout pageTitle="Docs">
      <div className="m-auto flex max-w-6xl p-5">
        {/* Left columm with elements */}
        <div className="flex flex-col border-r-2 border-body-200 pr-5">
          <DocSidebarHeader text="Fan Curves" />
          <ul className="mr-5 mb-5">
            {fanCurveSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s))
            )}
          </ul>

          <DocSidebarHeader text="Custom Sensors" />
          <ul className="mr-5 mb-5">
            {customSensorSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s))
            )}
          </ul>

          <DocSidebarHeader text="Command Line Arguments" />
          <ul className="mr-5 mb-5">
            {commandLineArgumentSections.map((s) =>
              SideBarDocSection(s, () => ScrollToSection(refs, s))
            )}
          </ul>
        </div>

        {/* Main section with actual documentation */}
        <div className={twMerge(styles.doc, "ml-5 max-w-2xl space-y-12")}>
          <DocHeader text="Fan Curves" />
          {fanCurveSections.map((s) => DocSectionComponent(s, refs))}

          <DocHeader text="Custom Sensors" />
          {customSensorSections.map((s) => DocSectionComponent(s, refs))}

          <DocHeader text="Command Line Arguments" />
          {commandLineArgumentSections.map((s) => DocSectionComponent(s, refs))}
        </div>
      </div>
    </Layout>
  );
};

export default DocsPage;

export const Head: HeadFC = () => (
  <SEO pathname={pageTitle} title={pageTitle}></SEO>
);
