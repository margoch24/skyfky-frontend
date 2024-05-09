export type FlightType = {
  id: string;
  departure: number;
  arrival: number;
  photo: string;
  airline: string;
  cabin_class: string;
  scheduled: string;

  price: number;
  currency: string;

  from_longitude: number;
  from_latitude: number;

  to_longitude: number;
  to_latitude: number;

  score: number;

  is_deleted: boolean;
};
