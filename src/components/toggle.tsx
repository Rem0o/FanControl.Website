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
    <label className="relative mr-1 inline-flex cursor-pointer self-center py-1">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        readOnly
      />
      <div
        onClick={onClick}
        className="peer h-4 w-9 rounded-full bg-gray-200 after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-blue-300"
      ></div>
      <span onClick={onClick} className="ml-2 select-none text-sm font-medium">
        {text}
      </span>
    </label>
  );
}
