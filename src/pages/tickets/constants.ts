import { Checkout } from "./checkout/Checkout";
import { PassengersInfo } from "./passengerInfo/PassengersInfo";
import { SeatSelection } from "./seatSelection/SeatSelection";
import { TicketCreationPagesType } from "./types";

export const TicketCreationPages: TicketCreationPagesType[] = [
  {
    key: "passengers-info",
    title: "Passenger information",
    element: PassengersInfo,
    default: true,
  },
  {
    key: "seat-selection",
    title: "Choose your seat",
    element: SeatSelection,
  },
  {
    key: "checkout",
    title: "Proceed to checkout",
    element: Checkout,
  },
];

export const PLANE_SEATS_LEGEND = [
  {
    color: "#0086f3",
    title: "Available seats",
  },
  {
    color: "#b2d9ff",
    title: "Taken seats",
  },
  {
    color: "#e4ecf8",
    title: "Other seats",
  },
];
