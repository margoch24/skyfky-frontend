import axiosInstance from "api/getAxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { convertObjToQuery } from "common/helpers/query";
import { Endpoints, PreparedQueryType, ResponseData } from "common/types";
import { FlightType } from "pages/flights/types";

export const getFlights = async (params: PreparedQueryType | null = {}) => {
  const query = convertObjToQuery(params);
  try {
    return await axiosInstance.get<ResponseData<FlightType[]>>(
      Endpoints.GetFlight + `?${query}`
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<FlightType[]>
    >;
  }
};
