import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "api/getAxiosInstance";
import { Endpoints, ResponseData } from "common/types";
import { TicketType } from "pages/tickets/types";

export const postTicket = async (params = {}, accessToken?: string | null) => {
  try {
    return await axiosInstance.post<ResponseData<TicketType>>(
      Endpoints.PostTicket,
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
      ResponseData<TicketType>
    >;
  }
};
