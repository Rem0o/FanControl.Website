import type React from "react";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { SpinningLogo } from "../reactComponents/spinningLogo";

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

  return (
    <nav
      {...restOfProps}
      className={twMerge(
        "flex w-full bg-primary-800 text-body-50 shadow-sm shadow-body-400",
        className
      )}
    >
      <div className="m-1 flex items-center justify-center">
        <SpinningLogo />
        <div className="ml-2">
          <a href={links[0].url}>Fan Control</a> {getPageTitle(pageTitle)}
        </div>
      </div>
      <ul className="ml-auto flex items-center justify-center">
        {links.map((link) => (
          <li key={link.title}>
            <a className="p-3 hover:bg-primary-700" href={link.url}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { NavBar };
