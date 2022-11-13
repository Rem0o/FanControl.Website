import { Link } from "gatsby";
import React from "react";
import icons from "../contents/icons";
import { useTimeoutBooleanState } from "../utilities/customHooks";

const links = [
  { url: "/", title: "Home" },
  //{ url: "/demo", title: "Demo" },
  { url: "/docs", title: "Docs" },
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
    <nav className="flex bg-body-700 text-body-50 shadow-md shadow-body-400">
      <div className="m-1 flex items-center justify-center">
        <svg
          onMouseEnter={() => setIsSpinning(true)}
          className={`${
            isSpinning ? "animate-spin" : ""
          } h-10 w-10 hover:animate-spin`}
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d={icons.svgPaths.fan} />
        </svg>
        <div className="ml-2">
          <Link to={links[0].url}>Fan Control</Link> {getPageTitle(pageTitle)}
        </div>
      </div>
      <ul className="ml-auto flex items-center justify-center">
        {links.map((link) => (
          <Link
            key={link.title}
            className="p-3 hover:bg-primary-600"
            to={link.url}
          >
            {link.title}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export { NavBar };
