import { twMerge } from "tailwind-merge";

const defaultClassName =
  "w-full border-spacing-1 border-b border-white bg-transparent text-base font-normal text-white focus:outline-none focus:border-primary-400 [&>option]:bg-body-800 [&>option]:text-body-100 [&>option]:py-2 [&>option]:px-3";

interface Props {
  labelClassName?: string;
  label: string;
}

export default function (
  props: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > &
    Props
) {
  const {
    className,
    label,
    labelClassName: labelClassName,
    ...restOfProps
  } = props;

  return (
    <>
      <label className={twMerge("mb-2 text-sm font-medium", labelClassName)}>
        {props.label}
      </label>
      <select
        className={twMerge(defaultClassName, className)}
        {...restOfProps}
      ></select>
    </>
  );
}
