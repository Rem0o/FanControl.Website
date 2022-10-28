import * as React from "react";
import { Link } from "gatsby";
import icons from "./../contents/icons";
import { useTimeoutBooleanState } from "../utilities/customHooks";
import consts from "../contents/consts";
import { ExternalLink, TrackedExternalLink } from "./externalLink";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const links = [
  { url: "/", title: "Home" },
  //{ url: "/demo", title: "Demo" },
  //{ url: "/docs", title: "Docs" },
  { url: "/about", title: "About" },
];

type Props = {
  pageTitle?: string;
  children: React.ReactNode;
};

const getPageTitle = (title?: string) => {
  if (title) {
    return `> ${title}`;
  }

  return "";
};

const FooterButton = ({
  href,
  text,
  iconSvgPath,
  viewBox
}: {
  href: string;
  text: string;
  iconSvgPath: string;
  viewBox?: string;
}) => {
  return (
    <OutboundLink href={href}>
      <button className="hover:border-blue-500 hover:text-blue-500 border border-slate-600 rounded-2xl py-1 px-2 pr-3 flex text-sm">
        <svg className="h-4 w-4" viewBox={viewBox ?? "0 0 24 24"}>
          <path fill="currentColor" d={iconSvgPath} />
        </svg>
        <span className="self-center ml-1">{text}</span>
      </button>
    </OutboundLink>
  );
};

const Layout = ({ pageTitle, children }: Props) => {
  const [isSpinning, setIsSpinning] = useTimeoutBooleanState(false, 3000);

  return (
    <div className="flex flex-col min-h-screen">
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

      <main className="bg-transparent grow">{children}</main>

      <footer className="border border-t bg-slate-100 border-slate-300 flex min-h-sm text-slate-500 pt-2 mt-10">
        <div className="flex flex-col space-y-0 min-w-sm m-auto">
          <div className="flex">
            <svg className="h-8 w-8" viewBox="0 0 24 24">
              <path fill="currentColor" d={icons.svgPaths.fan} />
            </svg>
            <span className="text-xl self-center ml-1">Fan Control</span>
          </div>
          <div>Rémi Mercier</div>
          <ExternalLink className="text-slate-500 hover:text-blue-500" href={consts.urls.email}>
            {consts.urls.email}
          </ExternalLink>
          <div className="flex space-x-3 py-3">
            <FooterButton
              iconSvgPath={icons.svgPaths.heart}
              href={consts.urls.sponsor}
              text="Sponsor"
            />
            <FooterButton
              iconSvgPath={icons.svgPaths.paypal}
              href={consts.urls.donationUrl}
              viewBox="0 0 16 16"
              text="PayPal"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
