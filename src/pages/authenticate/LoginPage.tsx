import { FC, memo, useCallback, useEffect, useState } from "react";
import { Layout } from "components/layout/Layout";
import { LayoutImageBg } from "components/layout/LayoutImageBg";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Popover,
  Typography,
} from "@mui/material";
import AuthBg from "/assets/authenticate/auth_bg.png";
import { CustomInput } from "components/wrappers/CustomInput";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, PagePath } from "shared/constants";
import { SubtitleFont } from "shared/constants/fonts";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ValidationErrorMessages,
  isEmailValid,
  isPaswordValid,
} from "common/utils/validations";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ResponseData } from "common/types";
import { LoginType } from "./types";
import { debounce } from "common/helpers/debounce";
import { showToastError } from "common/utils/toast";
import { useUserContext } from "common/hooks/userContext";
import { postLogin } from "api/requests/auth/postLogin";
import { DarkColor } from "shared/constants/colors";

export const LoginPage: FC = memo(() => {
  const { user, isAdmin, setIsAdmin, setAccessToken } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname = PagePath.Home, search = "" } = location?.state?.from ?? {};

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = !!anchorEl;
  const popoverId = open ? "simple-popover" : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const validatePassword = () => {
    const isValid = isPaswordValid(password);
    if (!isValid) {
      setPasswordError(ValidationErrorMessages.ValidPasswordRequired);
    }
    return isValid;
  };

  const validateAll = (): boolean => {
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    return emailValid && passwordValid;
  };

  const fetchFunc = useCallback(async () => {
    const params = {
      email,
      password,
    };

    return await postLogin(params, isAdmin);
  }, [email, password, isAdmin]);

  const { mutate } = useMutation<AxiosResponse<ResponseData<LoginType>>>({
    mutationFn: () => debounce(fetchFunc(), 500),
    onSuccess: (axiosResponse) => {
      if (!axiosResponse) {
        showToastError("Internal server error");
      }

      const { error, data } = axiosResponse?.data ?? {};

      if (error) {
        showToastError(data?.message || "Internal server error");
      }

      if (!data?.access_token) {
        return;
      }

      setAccessToken(data?.access_token);

      setTimeout(() => navigate(pathname + search, { replace: true }), 700);
    },
    onError: (err: Error) => {
      console.log(err);
      showToastError("Internal server error");
    },
  });

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

  const validateEmail = () => {
    const isValid = isEmailValid(email);
    if (!isValid) {
      setEmailError(ValidationErrorMessages.ValidEmailRequired);
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (user) {
      showToastError(
        "You are already logged in. To continue, please log out via your profile page"
      );
      return;
    }
    if (!validateAll()) return;

    mutate();
  };

  return (
    <>
      <Layout>
        <LayoutImageBg
          bgImage={AuthBg}
          sx={{
            minHeight: "100vh",
          }}
        >
          <Container
            sx={{
              margin: "auto",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: {
                  md: "50%",
                  sm: "70%",
                  xs: "100%",
                },
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                paddingTop: {
                  sm: "5rem",
                  xs: "10rem",
                },
              }}
            >
              <CustomInput
                placeholder="Email"
                onFocus={() => {
                  setEmailError("");
                }}
                onBlur={validateEmail}
                onChange={(newEmail) => setEmail(newEmail as string)}
                error={emailError}
                value={email}
              />
              <CustomInput
                sx={{ marginTop: "30px" }}
                placeholder="Password"
                onFocus={() => {
                  setPasswordError("");
                }}
                onBlur={validatePassword}
                onChange={(newPassword) => setPassword(newPassword as string)}
                error={passwordError}
                value={password}
                type="password"
              />
              <Box
                sx={{
                  marginTop: "30px",
                }}
              >
                <CustomButton
                  onClick={handleSubmit}
                  title="Login"
                  theme={ButtonTheme.Dark}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    sm: "row",
                    xs: "column",
                  },
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: {
                    sm: "10rem",
                    xs: "8rem",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "white",
                    fontFamily: SubtitleFont,
                    marginBottom: {
                      sm: 0,
                      xs: "2rem",
                    },
                    marginRight: {
                      sm: 0,
                      xs: "auto",
                    },
                  }}
                >
                  New around here?
                </Typography>

                <CustomButton
                  onClick={() => navigate(PagePath.Register)}
                  title="Register"
                  theme={ButtonTheme.Transparent}
                />
              </Box>
            </Box>
          </Container>
          <Button
            aria-describedby={popoverId}
            onClick={handlePopoverOpen}
            sx={{
              width: "100px",
              height: "50px",
              background: "black",
              borderRadius: 0,
              cursor: "default",
              backgroundColor: "transparent",
            }}
            disableRipple={true}
          ></Button>
          <Popover
            id={popoverId}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box
              sx={{
                padding: "10px 20px 10px 30px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: DarkColor,
                  fontFamily: SubtitleFont,
                }}
              >
                Login as admin?
              </Typography>
              <Checkbox
                disabled={!!user}
                onChange={handleCheckboxChange}
                checked={isAdmin}
              />
            </Box>
          </Popover>
        </LayoutImageBg>
      </Layout>
    </>
  );
});
