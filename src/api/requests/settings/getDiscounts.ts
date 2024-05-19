import axiosInstance from "api/getAxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { DiscountType, Endpoints, ResponseData } from "common/types";

export const getDiscounts = async () => {
  try {
    return await axiosInstance.get<ResponseData<DiscountType[]>>(
      Endpoints.GetDiscounts
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<DiscountType[]>
    >;
  }
};
