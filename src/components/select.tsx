import { twMerge } from "tailwind-merge";

const defaultClassName =
  "text-base font-normal text-white w-full bg-transparent border-white border-spacing-1 border-b focus:text-gray-700 focus:bg-white";

interface Props{
  labelClassList?: string,
  label: string
}

export default function (
  props: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & Props
) {
  const { className, label, labelClassList, ...restOfProps } = props;

  return (
    <>
      <label className={twMerge("mb-2 text-sm font-medium", labelClassList)}>{props.label}</label>
      <select
        className={twMerge(defaultClassName, className)}
        {...restOfProps}
      ></select>
    </>
  );
}
