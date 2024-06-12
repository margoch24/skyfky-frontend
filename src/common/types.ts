import { SxProps } from "@mui/material";

export type UserType = {
  id: string;
  email: string;
  name: string;
  phone_number: string;
  photo: string;
  is_deleted: boolean;
};

export enum Env {
  Production = "production",
  Development = "development",
  Test = "test",
}

export enum Endpoints {
  PostRegister = "/register",
  PostLogin = "/login",
  GetUser = "/user",
  PostRefreshAccess = "/refresh-access",
  PostLogout = "/logout",
  PostUploadImage = "/upload-image",
  GetImage = "/image",
  PostFlight = "/flight",
  GetFlight = "/flights",
  GetDiscounts = "/discounts",
  PostTicket = "/ticket",
  GetFutureTickets = "/future-tickets",
  GetPastTickets = "/past-tickets",
  PostReview = "/review",
  GetReviews = "/reviews",
  CheckTicket = "/check-ticket",
  PostContactUs = "/contact_us",
}

export type ResponseData<T> = {
  data: T & { message?: string };
  error: boolean;
  totalAmount?: { count?: number };
};

export enum QueryKeys {
  GetUser = "get_user",
  PostRefreshAccess = "refresh-access",
  GetPlaces = "get-places",
  GetFlights = "get-flights",
  GetPaginatedFlights = "get-paginated-flights",
  GetFromPlace = "get-from",
  GetToPlace = "get-to",
  GetFlight = "get-flight",
  GetDiscounts = "get-discounts",
  GetFutureTickets = "get-future-tickets",
  GetPastTickets = "get-past-tickets",
  GetReviews = "get-reviews",
}

export type ImageType = {
  filename: string;
};

export type MapboxPlaceType = {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  place_name: string;
  text: string;
  place_name_en: string;
  properties: MapboxPlaceTypeProperties;
  context: MapboxPlaceContextType[];
};

export type MapboxResponse = {
  features: MapboxPlaceType[];
};

export type MapboxPlaceTypeProperties = {
  foursquare: string;
  landmark: true;
  wikidata: boolean;
  address: string;
  category: string;
  maki: string;
};

export type MapboxPlaceContextType = {
  id: string;
  mapbox_id: string;
  text: string;
  text_en: string;
};

export type QueryType = {
  from_longitude?: number;
  from_latitude?: number;
  to_longitude?: number;
  to_latitude?: number;
  from?: MapboxPlaceType | null;
  to?: MapboxPlaceType | null;
  departureFullDate?: Date | null;
  arrivalFullDate?: Date | null;
  departure?: number;
  arrival?: number;
  cabin_class?: string[];
  price?: {
    min?: number;
    max?: number;
  };
  page?: string;
  limit?: number;
};

export type PreparedQueryType = {
  from_longitude?: number;
  from_latitude?: number;
  to_longitude?: number;
  to_latitude?: number;
  departure?: number;
  arrival?: number;
  cabin_class?: string[];
  price?: string;
  page?: string;
  limit?: number;
};

export type DiscountType = {
  id: string;
  key: string;
  value: string;
  description: string;
  is_deleted: boolean;
  created_at: number;
  updated_at: number;
};

export enum FiltersType {
  ToggleOptionsList = "toggleOptionsList",
  NumberRange = "numberRange",
}

export type OptionType = {
  title: string;
  value: string | number;
};

export type FiltersBlockProps = {
  queryKey: string;
  title: string;
  type: FiltersType;
  values: {
    min?: number;
    max?: number;
    defaultMaxValue?: number;
    defaultMinValue?: number;
    options?: OptionType[];
    defaultOptions?: OptionType[];
    step?: number;
  };
  sx?: SxProps;
};
