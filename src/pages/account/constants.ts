import { FutureTickets } from "./FutureTickets";
import { PastTickets } from "./PastTickets";
import { Profile } from "./Profile";
import { AccountPanelPageType } from "./types";

export enum AccountPanelPagesKeys {
  Profile = "profile",
  FutureTickets = "future-tickets",
  PastTickets = "past-tickets",
}

export const AccountPanelPages: AccountPanelPageType[] = [
  {
    key: AccountPanelPagesKeys.Profile,
    title: "Profile",
    element: Profile,
    default: true,
  },
  {
    key: AccountPanelPagesKeys.FutureTickets,
    title: "Future tickets",
    element: FutureTickets,
  },
  {
    key: AccountPanelPagesKeys.PastTickets,
    title: "Past tickets",
    element: PastTickets,
  },
];

export const AdminAccountPanelPages: AccountPanelPageType[] = [
  {
    key: AccountPanelPagesKeys.Profile,
    title: "Profile",
    element: Profile,
    default: true,
  },
];
