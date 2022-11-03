import { HeadFC } from "gatsby";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import DocSection from "../components/docs/docSection";
import { graph, linear } from "../components/docs/fanCurves";
import Layout from "../components/layout";
import NiceHeader from "../components/niceHeader";
import * as styles from "./docs.module.css"

const sections: DocSection[] = [linear, graph];

const DocSectionComponent = (section: DocSection, onClick: () => void) => {
  return (
    <li
      key={section.key}
      className="cursor-pointer rounded hover:bg-slate-200 p-1"
      onClick={() => onClick()}
    >
      {section.key}
    </li>
  );
};

const DocsPage = () => {
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  return (
    <Layout pageTitle="Docs">
      <div className="flex max-w-5xl m-auto p-5">
        {/* Left columm with elements */}
        <div className="flex border-r-2 border-slate-200">
          <ul className=" mr-5">
            {sections.map((s, i) =>
              DocSectionComponent(s, () => {
                refs.current[i]?.scrollIntoView({ behavior: "smooth" });
              })
            )}
          </ul>
        </div>

        {/* Main section with actual documentation */}
        <div className={twMerge(styles.doc, "ml-5 space-y-5")}>
          {sections.map((s, i) => {
            return (
              <div key={s.key} ref={(el) => (refs.current[i] = el)}>
                <NiceHeader icon={s.icon} text={s.key}></NiceHeader>
                {s.render()}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default DocsPage;

export const Head: HeadFC = () => <title>Docs</title>;
