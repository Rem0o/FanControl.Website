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
      <button className="flex rounded-2xl border border-slate-600 py-1 px-2 pr-3 text-sm hover:border-blue-500 hover:text-blue-500">
        <svg className="h-4 w-4" viewBox={viewBox ?? "0 0 24 24"}>
          <path fill="currentColor" d={iconSvgPath} />
        </svg>
        <span className="ml-1 self-center">{text}</span>
      </button>
    </OutboundLink>
  );
};

export const Footer = () => {
  return (
    <footer className="min-h-sm mt-10 flex border border-t border-slate-300 bg-slate-100 pt-2 text-center text-slate-500">
      <div className="min-w-sm m-auto flex flex-col space-y-0">
        <div className="flex items-center justify-center ">
          <svg className="h-8 w-8" viewBox="0 0 24 24">
            <path fill="currentColor" d={icons.svgPaths.fan} />
          </svg>
          <span className="ml-1 self-center text-xl">Fan Control</span>
        </div>
        <div>Rémi Mercier</div>
        <ExternalLink
          className="text-slate-500 hover:text-blue-500"
          href={consts.urls.email}
        >
          {consts.urls.email}
        </ExternalLink>
        <div className="flex items-center justify-center space-x-3 py-3">
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
};
