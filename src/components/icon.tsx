import React from "react";

const Icon = (path: string) => (
  <svg className="h-8 w-8" viewBox="0 0 24 24">
    <path fill="currentColor" d={path} />
  </svg>
);

export { Icon };
