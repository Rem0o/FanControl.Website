import { HeadFC } from "gatsby";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import DocSection from "../components/docs/docSection";
import { graph, linear, mix } from "../components/docs/fanCurves";
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

const fanCurvesSections: DocSection[] = [linear, graph, mix];
const commandLineArgumentsSections: DocSection[] = [c, w];

const ScrollToSection = (
  refs: React.MutableRefObject<Map<string, HTMLDivElement | null>>,
  section: DocSection
) => {
  refs.current.get(section.key)?.scrollIntoView({ behavior: "smooth" });
};

const SideBarDocSection = (section: string, onClick: () => void) => {
  return (
    <li
      key={section}
      className="cursor-pointer rounded p-1 hover:bg-body-200"
      onClick={() => onClick()}
    >
      {section}
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
  <h3 className="my-2 font-medium underline">{text}</h3>
);

const DocsPage = () => {
  const refs = useRef<Map<string, HTMLDivElement | null>>(
    new Map<string, HTMLDivElement | null>()
  );

  return (
    <Layout pageTitle="Docs">
      <div className="m-auto flex max-w-5xl p-5">
        {/* Left columm with elements */}
        <div className="flex flex-col border-r-2 border-body-200 pr-5">
          <DocSidebarHeader text="Fan Curves" />
          <ul className="mr-5">
            {fanCurvesSections.map((s) =>
              SideBarDocSection(s.key, () => ScrollToSection(refs, s))
            )}
          </ul>

          <DocSidebarHeader text="Custom Sensors" />
          <ul className="mr-5">
            {SideBarDocSection("Coming soon...", () => {})}
          </ul>

          <DocSidebarHeader text="Command line arguments" />
          <ul className="mr-5">
            {commandLineArgumentsSections.map((s) =>
              SideBarDocSection(s.key, () => ScrollToSection(refs, s))
            )}
          </ul>
        </div>

        {/* Main section with actual documentation */}
        <div className={twMerge(styles.doc, "ml-5 space-y-12")}>
          {fanCurvesSections.map((s) => DocSectionComponent(s, refs))}
          {commandLineArgumentsSections.map((s) =>
            DocSectionComponent(s, refs)
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DocsPage;

export const Head: HeadFC = () => (
  <SEO pathname={pageTitle} title={pageTitle}></SEO>
);
