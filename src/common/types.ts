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
  properties: MapboxPlaceTypeProperties;
};

export type MapboxResponse = {
  features: MapboxPlaceType[];
};

export type MapboxPlaceTypeProperties = {
  full_address: string;
};
