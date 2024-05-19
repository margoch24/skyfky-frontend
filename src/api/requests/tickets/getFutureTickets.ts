import axiosInstance from "api/getAxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { convertObjToQuery } from "common/helpers/query";
import { Endpoints, QueryType, ResponseData } from "common/types";
import { TicketType } from "pages/tickets/types";

export const getFutureTickets = async (
  params: QueryType | null = {},
  accessToken?: string | null,
  isAdmin?: boolean
) => {
  const query = convertObjToQuery(params);
  try {
    return await axiosInstance.get<ResponseData<TicketType[]>>(
      Endpoints.GetFutureTickets + `?${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...(isAdmin && { "referrer-type": "admin" }),
        },
      }
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<TicketType[]>
    >;
  }
};
