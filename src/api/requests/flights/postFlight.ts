import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "api/getAxiosInstance";
import { Endpoints, ResponseData } from "common/types";
import { FlightType } from "pages/flights/types";

export const postFlight = async (params = {}, accessToken?: string | null) => {
  try {
    return await axiosInstance.post<ResponseData<FlightType>>(
      Endpoints.PostFlight,
      {
        ...params,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<FlightType>
    >;
  }
};
