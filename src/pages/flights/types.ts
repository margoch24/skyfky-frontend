export type FlightType = {
  id: string;
  departure: number;
  arrival: number;
  photo: string;
  airline: string;
  cabin_class: string;
  scheduled: string;
  available_seats?: number | SeatType[];
  seats?: SeatType[];

  price: number;
  currency: string;

  from_longitude: number;
  from_latitude: number;

  to_longitude: number;
  to_latitude: number;

  score: number;

  is_deleted: boolean;
};

export type SeatType = {
  id: string;
  row: number;
  column: string;
  type: string;
  cabin_class: string;

  is_deleted: boolean;
};

export enum SeatColumns {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}
