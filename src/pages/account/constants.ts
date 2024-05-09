import { FutureTickets } from "./FutureTickets";
import { PastTickets } from "./PastTickets";
import { Profile } from "./Profile";
import { AccountPanelPageType } from "./types";

export const AccountPanelPages: AccountPanelPageType[] = [
  {
    key: "profile",
    title: "Profile",
    element: Profile,
    default: true,
  },
  {
    key: "future-tickets",
    title: "Future tickets",
    element: FutureTickets,
  },
  {
    key: "past-tickets",
    title: "Past tickets",
    element: PastTickets,
  },
];
