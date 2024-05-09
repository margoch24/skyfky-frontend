import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "api/getAxiosInstance";
import { Endpoints, ResponseData } from "common/types";
import { LoginType } from "pages/authenticate/types";

export const postLogin = async (params = {}, isAdmin?: boolean) => {
  try {
    return await axiosInstance.post<ResponseData<LoginType>>(
      Endpoints.PostLogin,
      {
        ...params,
      },
      {
        headers: {
          ...(isAdmin && { "referrer-type": "admin" }),
        },
      }
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<LoginType>
    >;
  }
};
