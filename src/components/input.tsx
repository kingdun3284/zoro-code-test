"use client";

import {
  DetailedHTMLProps,
  FormEvent,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";
import cn from "classnames";
interface BaseInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export default function Input({
  children,
  onInput,
  onInvalid,
  ...props
}: BaseInputProps) {
  const { className, ...rest } = props;
  //const [firstInput, setFirstInput] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const inputHandler = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      if (e.target instanceof HTMLInputElement)
        setValidationMessage(e.target.validationMessage);
      onInput?.(e);
    },
    [onInput]
  );
  const invalidHandler = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target instanceof HTMLInputElement)
        setValidationMessage(e.target.validationMessage);
      onInvalid?.(e);
    },
    [onInvalid]
  );
  return (
    <>
      <input
        className={cn(
          className,
          "rounded px-2 py-2 border border-slate-400 focus:ring focus:ring-orange-400 focus:outline-none hover:bg-slate-100",
          { "invalid:bg-red-200": validationMessage }
        )}
        {...rest}
        onInput={inputHandler}
        onInvalid={invalidHandler}
      >
        {children}
      </input>
      {validationMessage && (
        <div className="text-red-500 text-sm">{validationMessage}</div>
      )}
    </>
  );
}
