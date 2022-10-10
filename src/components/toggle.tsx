import * as React from "react";

type ToggleProps = {
  checkedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  text?: string;
};

export default function Toggle({ checkedState, text }: ToggleProps) {
  const [checked, setChecked] = checkedState;

  const onClick = () => {
    setChecked(!checked);
  };

  return (
    <label className="mr-1 inline-flex py-1 relative cursor-pointer self-center">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        readOnly
      />
      <div
        onClick={onClick}
        className="w-9 h-4 bg-gray-200 rounded-full peer peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-500"
      ></div>
      <span onClick={onClick} className="ml-2 text-sm font-medium select-none">
        {text}
      </span>
    </label>
  );
}
