import axiosInstance from "api/getAxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { Endpoints, ResponseData } from "common/types";
import { LoginType } from "pages/authenticate/types";

export const postRefreshAccess = async () => {
  try {
    return await axiosInstance.post<ResponseData<LoginType>>(
      Endpoints.PostRefreshAccess
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<LoginType>
    >;
  }
};
