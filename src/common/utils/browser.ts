import { Dispatch, SetStateAction } from "react";

export function isWindowDefined(): boolean {
  return typeof window !== "undefined";
}

export const setInnerWindowWidth = (
  setInnerWidth: Dispatch<SetStateAction<number>>,
  editWidth?: (width: number) => number
) => {
  const updateWindowDimensions = () => {
    const newWidth = editWidth
      ? editWidth(window.innerWidth)
      : window.innerWidth;
    setInnerWidth(newWidth);
  };

  window.addEventListener("resize", updateWindowDimensions);
  return () => window.removeEventListener("resize", updateWindowDimensions);
};
