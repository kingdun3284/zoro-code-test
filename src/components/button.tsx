import cn from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Button({ children, ...props }: ButtonProps) {
  const { className, ...rest } = props;
  return (
    <button
      className={cn(
        className,
        "disabled:bg-gray-700 bg-orange-600 text-white hover:bg-orange-700 rounded px-2 py-1"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
