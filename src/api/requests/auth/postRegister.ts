import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "api/getAxiosInstance";
import { Endpoints, ResponseData, UserType } from "common/types";

export const postRegister = async (params = {}) => {
  try {
    return await axiosInstance.post<ResponseData<UserType>>(
      Endpoints.PostRegister,
      {
        ...params,
      }
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<UserType>
    >;
  }
};
