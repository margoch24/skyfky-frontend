import axiosInstance from "api/getAxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { Endpoints, ResponseData } from "common/types";
import { TicketType } from "pages/tickets/types";

export const getCheckTicket = async ({
  accessToken,
  ticketId,
}: {
  ticketId?: string;
  accessToken?: null | string;
}) => {
  try {
    return await axiosInstance.get<ResponseData<TicketType>>(
      `${Endpoints.CheckTicket}?ticket_id=${ticketId}`,
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
