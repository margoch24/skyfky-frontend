import { UserType } from "common/types";
import { FlightType, SeatType } from "pages/flights/types";
import { FC } from "react";
import { ElementProps } from "./TicketCreationPanel";

export type TicketCreationPagesType = {
  key: string;
  title: string;
  element: FC<ElementProps>;
  default?: boolean;
};

export enum PassengerType {
  Adult = "adult",
  Child = "child",
}

export type PassengerInfoType = {
  cardId: string;
  name: string;
  surname: string;
  parent?: string;
  dateOfBirth: Date;
  flight?: FlightType;
  seat?: SeatType;
};

export type TicketType = {
  id: string;
  name: string;
  surname: string;
  date_of_birth: number;
  type: string;
  qrcode: string;

  price: number;
  currency: string;

  is_deleted: boolean;

  user_id: string;
  user: UserType;

  seat_id: string;
  seat: SeatType;

  flight_id: string;
  flight: FlightType;
};
