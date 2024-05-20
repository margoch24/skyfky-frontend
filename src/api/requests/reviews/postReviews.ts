import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "api/getAxiosInstance";
import { Endpoints, ResponseData } from "common/types";
import { ReviewType } from "pages/reviews/constants";

export const postReview = async (params = {}, accessToken?: string | null) => {
  try {
    return await axiosInstance.post<ResponseData<ReviewType>>(
      Endpoints.PostReview,
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
      ResponseData<ReviewType>
    >;
  }
};
