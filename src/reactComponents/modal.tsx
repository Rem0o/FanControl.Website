import type { ReactNode } from "react";

export const Modal = ({
  children: children,
  exitModal
}: {
  children: ReactNode;
  exitModal: Function;
}) => (
  <>
    <div className="fixed left-1/2 top-1/2 z-50 m-auto -translate-x-1/2 -translate-y-1/2 animate-scale-in rounded-2xl glass-strong p-6 shadow-2xl max-w-lg w-full mx-4">
      {XButton(exitModal)}
      <div className="flex flex-col items-center self-center">{children}</div>
    </div>

    <div
      onClick={() => exitModal()}
      className="fixed left-0 top-0 z-40 block h-full w-full bg-black/60 backdrop-blur-sm animate-fade-in cursor-pointer"
    ></div>
  </>
);

function XButton(exitModal: Function) {
  return (
    <button
      className="absolute right-3 top-3 h-8 w-8 rounded-full bg-body-200/80 hover:bg-body-300 dark:bg-body-700/80 dark:hover:bg-body-600 text-body-700 dark:text-body-200 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 flex items-center justify-center font-bold hover:scale-110"
      onClick={() => exitModal()}
      aria-label="Close modal"
    >
      ✕
    </button>
  );
}
