import { HeadFC } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";

type DocSection = {
  key: string;
  render: () => JSX.Element;
};

const sections: DocSection[] = [
  {
    key: "Linear",
    render: () => {
      return (
        <>
          This is a linear curve description.
        </>
      );
    },
  },
  {
    key: "Graph",
    render: () => {
      return <>This is a graph curve description.</>;
    },
  },
];

const DocSectionComponent = (
  section: DocSection,
  setSection: (section: DocSection) => void
) => {
  return (
    <li
      key={section.key}
      className="cursor-pointer rounded hover:bg-slate-200 p-1"
      onClick={() => setSection(section)}
    >
      {section.key}
    </li>
  );
};

const DocsPage = () => {
  const [getSection, setSection] = useState(sections[0]);

  return (
    <Layout pageTitle="Docs">
      <div className="flex max-w-5xl m-auto p-5">
        {/* Left columm with elements */}
        <div className="flex  border-r-2 border-slate-200">
          <ul className=" mr-5">
            {sections.map((s) => DocSectionComponent(s, setSection))}
          </ul>
        </div>

        {/* Main section with actual documentation */}
        <div className="ml-5">
          <h3 className="text-2xl font-semibold mb-2">{getSection.key}</h3>
          {getSection.render()}
        </div>
      </div>
    </Layout>
  );
};

export default DocsPage;

export const Head: HeadFC = () => <title>Docs</title>;
