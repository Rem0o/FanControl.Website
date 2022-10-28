import { OutboundLink, OutboundLinkProps } from "gatsby-plugin-google-gtag";
import React from "react";
import { twMerge } from "tailwind-merge";

const ExternalLink = (
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => {
  const { children, className, href, ...restOfProps } = props;
  return (
    <a
      className={twMerge("text-blue-600 underline", className)}
      href={href}
      {...restOfProps}
    >
      {children}
    </a>
  );
};

const TrackedExternalLink = (
  props: OutboundLinkProps & React.AllHTMLAttributes<HTMLAnchorElement>
) => {
  const { children, className, href, ...restOfProps } = props;
  return (
    <OutboundLink
      className={twMerge("text-blue-600 underline", className)}
      href={href}
      {...restOfProps}
    >
      {children}
    </OutboundLink>
  );
};

export { ExternalLink, TrackedExternalLink };
