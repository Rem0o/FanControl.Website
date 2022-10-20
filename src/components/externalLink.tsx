import React from "react";

const ExternalLink = ({ href, children }: { href: string, children: React.ReactNode; }) => {
    return (
      <a className="text-blue-600 underline" href={href}>
        {children}
      </a>
    );
  };

export default ExternalLink;