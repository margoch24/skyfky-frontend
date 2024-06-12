import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "api/getAxiosInstance";
import { Endpoints, ResponseData } from "common/types";
import { ContactUsType } from "pages/contact_us/constants";

export const postContactUs = async (params = {}) => {
  try {
    return await axiosInstance.post<ResponseData<ContactUsType>>(
      Endpoints.PostContactUs,
      {
        ...params,
      }
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<ContactUsType>
    >;
  }
};
