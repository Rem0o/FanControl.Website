import React from "react";
import icons from "../contents/icons";
import consts from "../contents/consts";
import { ExternalLink } from "./externalLink";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const FooterButton = ({
  href,
  text,
  iconSvgPath,
  viewBox,
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

const Footer = () => {
  return (
    <footer className="border border-t bg-slate-100 border-slate-300 flex min-h-sm text-slate-500 pt-2 mt-10 text-center">
      <div className="flex flex-col space-y-0 min-w-sm m-auto">
        <div className="flex items-center justify-center ">
          <svg className="h-8 w-8" viewBox="0 0 24 24">
            <path fill="currentColor" d={icons.svgPaths.fan} />
          </svg>
          <span className="text-xl self-center ml-1">Fan Control</span>
        </div>
        <div>Rémi Mercier</div>
        <ExternalLink
          className="text-slate-500 hover:text-blue-500"
          href={consts.urls.email}
        >
          {consts.urls.email}
        </ExternalLink>
        <div className="flex space-x-3 py-3 items-center justify-center">
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
  );
}

export { Footer };