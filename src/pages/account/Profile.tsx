import { Box, Typography } from "@mui/material";
import { useUserContext } from "common/hooks/userContext";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { DarkColor } from "shared/constants/colors";
import { TitleFont } from "shared/constants/fonts";
import DefaultProfilePhoto from "/assets/default_profile_photo.jpeg";
import { getImageHelper } from "common/helpers/getImage";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, PagePath } from "shared/constants";
import { postLogout } from "api/requests/auth/postLogout";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ResponseData } from "common/types";
import { debounce } from "common/helpers/debounce";
import { showToastError } from "common/utils/toast";
import { useNavigate } from "react-router-dom";
import { CustomPopup } from "components/wrappers/CustomPopup";
import { UploadPhotoZone } from "components/wrappers/UploadPhotoZone";
import { putUser } from "api/requests/user/putUser";

export const Profile: FC = memo(() => {
  const { user, accessToken, setUser, setAccessToken, setIsAdmin, isAdmin } =
    useUserContext();

  const [newFilename, setFilename] = useState<string | null>(null);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handlePopupOpen = () => {
    setOpen(true);
  };

  const handlePopupClose = () => {
    setOpen(false);
  };

  const fetchUpdateUserFunc = useCallback(async () => {
    const params = {
      accessToken,
      filename: newFilename,
    };
    return await putUser(params);
  }, [accessToken, newFilename]);

  const { mutate: updateUserMutate } = useMutation<
    AxiosResponse<ResponseData<object>>
  >({
    mutationFn: () => debounce(fetchUpdateUserFunc(), 500),
    onSuccess: (axiosResponse) => {
      if (!axiosResponse) {
        showToastError("Internal server error");
      }

      const { error, data } = axiosResponse?.data ?? {};

      if (error) {
        showToastError(data?.message || "Internal server error");
        return;
      }
    },
    onError: (err: Error) => {
      console.log(err);
      showToastError("Internal server error");
    },
  });

  const handleUpload = (filename: string) => {
    handlePopupClose();
    setUser((prevUser) => (prevUser ? { ...prevUser, photo: filename } : null));
    setFilename(filename);
  };

  useEffect(() => {
    if (newFilename) {
      updateUserMutate();
    }
  }, [newFilename, updateUserMutate]);

  const fetchLogoutFunc = useCallback(async () => {
    const params = {
      accessToken,
    };
    return await postLogout(params);
  }, [accessToken]);

  const { mutate: logoutMutate } = useMutation<
    AxiosResponse<ResponseData<object>>
  >({
    mutationFn: () => debounce(fetchLogoutFunc(), 500),
    onSuccess: (axiosResponse) => {
      if (!axiosResponse) {
        showToastError("Internal server error");
      }

      const { error, data } = axiosResponse?.data ?? {};

      if (error) {
        showToastError(data?.message || "Internal server error");
        return;
      }

      setAccessToken(null);
      setUser(null);
      setIsAdmin(false);

      navigate(PagePath.Home);
    },
    onError: (err: Error) => {
      console.log(err);
      showToastError("Internal server error");
    },
  });

  return (
    <Box
      sx={{
        "@media (max-width: 300px)": {
          maxWidth: "210px",
          margin: "0 5px",
        },
        margin: "0 1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            sm: "row",
            xs: "column-reverse",
          },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            marginRight: {
              md: "10rem",
              xs: "2rem",
            },
          }}
        >
          {!isAdmin && (
            <Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontFamily: TitleFont,
                  opacity: "50%",
                  color: DarkColor,
                }}
              >
                Name
              </Typography>
              <Typography
                sx={{
                  fontSize: "25px",
                  fontFamily: TitleFont,
                  color: DarkColor,
                }}
              >
                {user?.name}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              marginTop: "35px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: TitleFont,
                opacity: "50%",
                color: DarkColor,
              }}
            >
              Email
            </Typography>
            <Typography
              sx={{
                fontSize: "25px",
                fontFamily: TitleFont,
                color: DarkColor,
              }}
            >
              {user?.email}
            </Typography>
          </Box>

          {!isAdmin && (
            <Box
              sx={{
                marginTop: "35px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontFamily: TitleFont,
                  opacity: "50%",
                  color: DarkColor,
                }}
              >
                Phone number
              </Typography>
              <Typography
                sx={{
                  fontSize: "25px",
                  fontFamily: TitleFont,
                  color: DarkColor,
                }}
              >
                {user?.phone_number}
              </Typography>
            </Box>
          )}
        </Box>
        <Box>
          <Box
            sx={{
              width: "200px",
              height: "200px",
              overflow: "hidden",
              borderRadius: "50%",
              marginBottom: {
                sm: 0,
                xs: "2rem",
              },
            }}
          >
            <img
              height="100%"
              width="100%"
              src={
                user?.photo ? getImageHelper(user?.photo) : DefaultProfilePhoto
              }
            />
          </Box>
          {!isAdmin && (
            <CustomPopup onClose={handlePopupClose} open={open}>
              <Box
                sx={{
                  padding: {
                    sm: "3rem",
                    xs: "1.5rem",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: DarkColor,
                    fontFamily: TitleFont,
                    fontSize: "25px",
                    marginBottom: "15px",
                  }}
                >
                  Uplod your photo
                </Typography>
                <UploadPhotoZone onUpload={handleUpload} />
              </Box>
            </CustomPopup>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: {
            sm: "row",
            xs: "column-reverse",
          },
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        <CustomButton
          sx={{
            marginTop: {
              sm: 0,
              xs: "2rem",
            },
            width: {
              sm: "auto",
              xs: "100%",
            },
          }}
          onClick={logoutMutate}
          title="Logout"
          theme={ButtonTheme.Transparent}
        />

        {!isAdmin && (
          <CustomButton
            sx={{
              width: {
                sm: "auto",
                xs: "100%",
              },
            }}
            onClick={handlePopupOpen}
            title="Change photo"
            theme={ButtonTheme.Dark}
          />
        )}
      </Box>
    </Box>
  );
});
