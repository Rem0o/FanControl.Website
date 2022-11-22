import React from "react";

const BigIcon = (path: string) => (
  <svg className="h-12 w-12" viewBox="0 0 24 24">
    <path fill="currentColor" d={path} />
  </svg>
);

const Icon = (path: string) => (
  <svg className="h-8 w-8" viewBox="0 0 24 24">
    <path fill="currentColor" d={path} />
  </svg>
);

const SmallIcon = (path: string) => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path fill="currentColor" d={path} />
  </svg>
);


export { BigIcon, Icon, SmallIcon };
