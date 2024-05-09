import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "api/getAxiosInstance";
import { Endpoints, ResponseData } from "common/types";

export const postLogout = async ({
  accessToken,
}: {
  accessToken?: null | string;
}) => {
  try {
    return await axiosInstance.post<ResponseData<object>>(
      Endpoints.PostLogout,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<object>
    >;
  }
};
