import type React from "react";
import type { HTMLAttributes } from "react";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { SpinningLogo } from "../reactComponents/spinningLogo";
import { Icon } from "../reactComponents/icon";
import { icons } from "../common/icons";

const links = [
  { url: "/", title: "Home" },
  //{ url: "/demo", title: "Demo" },
  { url: "/docs/", title: "Docs" },
  { url: "/about/", title: "About" }
];

const getPageTitle = (title?: string) => {
  if (title) {
    return `> ${title}`;
  }

  return "";
};

const NavBar = (
  props: HTMLAttributes<HTMLElement> & { pageTitle?: string }
) => {
  const { pageTitle, className, ...restOfProps } = props;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial dark mode state
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <nav
      {...restOfProps}
      className={twMerge(
        "glass border-body-200/50 dark:border-body-700/50 sticky top-0 z-30 flex w-full border-b text-body-900 shadow-md backdrop-blur-xl transition-all duration-300 dark:text-body-100",
        className
      )}
    >
      <div className="m-1 ml-3 flex items-center justify-center">
        <SpinningLogo className="h-10 w-10" />
        <div className="ml-3 font-semibold">
          <a
            href={links[0].url}
            className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
          >
            Fan Control
          </a>
          {pageTitle && (
            <span className="text-body-600 dark:text-body-400">
              {" "}
              {getPageTitle(pageTitle)}
            </span>
          )}
        </div>
      </div>
      <ul className="ml-auto mr-2 flex items-center justify-center">
        {links.map((link) => (
          <li key={link.title}>
            <a
              className="rounded-lg px-4 py-3 font-medium transition-all duration-200 hover:bg-primary-600/10 hover:text-primary-600 dark:hover:text-primary-400"
              href={link.url}
            >
              {link.title}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={toggleDarkMode}
            className="ml-2 cursor-pointer rounded-lg p-2 transition-all duration-200 hover:bg-primary-600/10 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Toggle dark mode"
          >
            <Icon icon={isDark ? icons.sun : icons.moon} className="h-6 w-6" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export { NavBar };
