import { FC } from "react";

export type AccountPanelPageType = {
  key: string;
  title: string;
  element: FC;
  default?: boolean;
};
