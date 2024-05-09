import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "api/getAxiosInstance";
import { Endpoints, ImageType, ResponseData } from "common/types";

export const postUploadImage = async (formData: FormData | null) => {
  try {
    return await axiosInstance.post<ResponseData<ImageType>>(
      Endpoints.PostUploadImage,
      formData
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<ImageType>
    >;
  }
};
