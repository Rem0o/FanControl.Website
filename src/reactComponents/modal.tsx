import type { ReactNode } from "react";

export const Modal = ({
  children: children,
  exitModal
}: {
  children: ReactNode;
  exitModal: Function;
}) => (
  <>
    <div className="glass-strong fixed left-1/2 top-1/2 z-50 m-auto mx-4 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 animate-scale-in rounded-2xl p-6 shadow-2xl">
      {XButton(exitModal)}
      <div className="flex flex-col items-center self-center">{children}</div>
    </div>

    <div
      onClick={() => exitModal()}
      className="fixed left-0 top-0 z-40 block h-full w-full animate-fade-in cursor-pointer bg-black/60 backdrop-blur-sm"
    ></div>
  </>
);

function XButton(exitModal: Function) {
  return (
    <button
      className="bg-body-200/80 dark:bg-body-700/80 absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-bold text-body-700 transition-all duration-200 hover:scale-110 hover:bg-body-300 hover:text-primary-600 dark:text-body-200 dark:hover:bg-body-600 dark:hover:text-primary-400"
      onClick={() => exitModal()}
      aria-label="Close modal"
    >
      ✕
    </button>
  );
}
