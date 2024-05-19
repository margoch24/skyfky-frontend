import axiosInstance from "api/getAxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { Endpoints, ResponseData } from "common/types";
import { FlightType } from "pages/flights/types";

export const getFlight = async (flight_id: string) => {
  try {
    return await axiosInstance.get<ResponseData<FlightType>>(
      Endpoints.PostFlight + `?flight_id=${flight_id}`
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<FlightType>
    >;
  }
};
