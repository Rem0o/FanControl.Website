import { Link } from "gatsby";
import React from "react";
import icons from "../contents/icons";
import { useTimeoutBooleanState } from "../utilities/customHooks";

const links = [
  { url: "/", title: "Home" },
  //{ url: "/demo", title: "Demo" },
  //{ url: "/docs", title: "Docs" },
  { url: "/about", title: "About" },
];

const getPageTitle = (title?: string) => {
  if (title) {
    return `> ${title}`;
  }

  return "";
};

const NavBar = ({ pageTitle }: { pageTitle: string | undefined }) => {
  const [isSpinning, setIsSpinning] = useTimeoutBooleanState(false, 3000);

  return (
    <nav className="bg-blue-500 text-slate-50 flex shadow-slate-400 shadow-md">
      <div className="flex justify-center items-center m-1">
        <svg
          onMouseEnter={() => setIsSpinning(true)}
          className={`${
            isSpinning ? "animate-spin" : ""
          } hover:animate-spin h-10 w-10`}
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d={icons.svgPaths.fan} />
        </svg>
        <div className="ml-2">
          <Link to={links[0].url}>Fan Control</Link> {getPageTitle(pageTitle)}
        </div>
      </div>
      <ul className="flex ml-auto justify-center items-center">
        {links.map((link) => (
          <li key={link.title} className="p-3 hover:bg-blue-600">
            <Link to={link.url}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { NavBar };