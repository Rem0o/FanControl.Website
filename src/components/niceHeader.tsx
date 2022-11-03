import React from "react";

const NiceHeader = ({ icon, text }: { icon?: string; text: string }) => {
  return (
    <h1 className="flex text-left items-center mb-2">
      {icon ? (
        <svg className="h-12 w-12 mr-5" viewBox="0 0 24 24">
          <path fill="currentColor" d={icon} />
        </svg>
      ) : (
        <></>
      )}

      <span className="align-middle text-2xl font-semibold">{text}</span>
    </h1>
  );
};

export default NiceHeader;
