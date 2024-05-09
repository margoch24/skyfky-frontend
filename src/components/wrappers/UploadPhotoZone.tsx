import { FC, memo, useCallback, useState } from "react";
import { DropzoneArea } from "mui-file-dropzone";
import { Box } from "@mui/material";
import { CustomButton } from "./CustomButton";
import { ButtonTheme } from "shared/constants";
import { postUploadImage } from "api/requests/images/postUploadImage";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ImageType, ResponseData } from "common/types";
import { debounce } from "common/helpers/debounce";
import { showToastError } from "common/utils/toast";

interface UploadPhotoZoneProps {
  onUpload?: (filename: string) => void;
}

export const UploadPhotoZone: FC<UploadPhotoZoneProps> = memo(
  ({ onUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<FormData | null>(null);

    const fetchUploadFunc = useCallback(async () => {
      return await postUploadImage(formData);
    }, [formData]);

    const { mutate: uploadMutate } = useMutation<
      AxiosResponse<ResponseData<ImageType>>
    >({
      mutationFn: () => debounce(fetchUploadFunc(), 500),
      onSuccess: (axiosResponse) => {
        if (!axiosResponse) {
          showToastError("Internal server error");
        }

        const { error, data } = axiosResponse?.data ?? {};

        if (error) {
          showToastError(data?.message || "Internal server error");
          return;
        }

        const { filename } = data;
        onUpload?.(filename);
      },
      onError: (err: Error) => {
        console.log(err);
        showToastError("Internal server error");
      },
    });

    const handleChange = (files: File[]) => {
      setFile(files[0]);
    };

    const handleUpload = () => {
      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      setFormData(formData);

      uploadMutate();
    };

    return (
      <>
        <DropzoneArea
          fileObjects
          acceptedFiles={["image/*"]}
          onChange={handleChange}
          useChipsForPreview
          filesLimit={1}
        />

        <Box
          sx={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <CustomButton
            onClick={handleUpload}
            title="Upload"
            theme={ButtonTheme.Dark}
          />
        </Box>
      </>
    );
  }
);
