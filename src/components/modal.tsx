"use client";

import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";

export interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  onClosed: () => void;
}

export default function Modal({ children, show, onClosed }: ModalProps) {
  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target == e.currentTarget) onClosed();
  };

  if (show)
    return (
      <div
        onClick={clickHandler}
        className="bg-gray-500 bg-opacity-10 backdrop-filter backdrop-blur-[2px] z-10 p-4 absolute h-full w-full flex items-center justify-center left-0 top-0"
      >
        <div className="flex flex-col p-4 bg-white rounded-lg">{children}</div>
      </div>
    );
}
