import axiosInstance from "api/getAxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { Endpoints, ResponseData, UserType } from "common/types";

export const getUser = async (
  {
    accessToken,
  }: {
    accessToken?: null | string;
  },
  isAdmin?: boolean
) => {
  try {
    return await axiosInstance.get<ResponseData<UserType>>(Endpoints.GetUser, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(isAdmin && { "referrer-type": "admin" }),
      },
    });
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<UserType>
    >;
  }
};
