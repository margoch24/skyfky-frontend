import axiosInstance from "api/getAxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { convertObjToQuery } from "common/helpers/query";
import { Endpoints, PreparedQueryType, ResponseData } from "common/types";
import { ReviewType } from "pages/reviews/constants";

export const getReviews = async (params: PreparedQueryType | null = {}) => {
  const query = convertObjToQuery(params);
  try {
    return await axiosInstance.get<ResponseData<ReviewType[]>>(
      Endpoints.GetReviews + `?${query}`
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<ReviewType[]>
    >;
  }
};
