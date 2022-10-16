import React from "react";

const Icon = (path: string) => (
  <svg className="w-8 h-8" viewBox="0 0 24 24">
    <path fill="currentColor" d={path} />
  </svg>
);

export { Icon };
