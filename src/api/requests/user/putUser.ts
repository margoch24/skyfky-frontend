import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "api/getAxiosInstance";
import { Endpoints, ResponseData } from "common/types";

export const putUser = async ({
  accessToken,
  filename,
}: {
  accessToken?: string | null;
  filename?: string | null;
}) => {
  try {
    return await axiosInstance.put<ResponseData<object>>(
      Endpoints.GetUser,
      {
        photo: filename,
      },
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
