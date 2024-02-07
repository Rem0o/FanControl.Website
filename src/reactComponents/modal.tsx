import type { ReactNode } from "react";

export const Modal = ({
  children: children,
  exitModal
}: {
  children: ReactNode;
  exitModal: Function;
}) => (
  <>
    <div className="fixed left-1/2 top-1/2 z-50 m-auto -translate-x-1/2 -translate-y-1/2 rounded bg-slate-50 p-5 shadow-xl">
      {XButton(exitModal)}
      <div className="flex flex-col items-center self-center">{children}</div>
    </div>

    <div
      onClick={() => exitModal()}
      className="fixed left-0 top-0 z-40 block h-full w-full bg-black opacity-50 "
    ></div>
  </>
);
function XButton(exitModal: Function) {
  return <button
    className="absolute right-2 top-2 rounded-full border border-body-700 px-2 text-body-700 hover:border-primary-600 hover:text-primary-600"
    onClick={() => exitModal()}
  >
    X
  </button>;
}

