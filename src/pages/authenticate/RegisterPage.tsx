import { FC, memo, useCallback, useEffect, useState } from "react";
import { Layout } from "components/layout/Layout";
import { LayoutImageBg } from "components/layout/LayoutImageBg";
import { Box, Container, Typography } from "@mui/material";
import AuthBg from "/assets/authenticate/auth_bg.png";
import { CustomInput } from "components/wrappers/CustomInput";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, PagePath } from "shared/constants";
import { SubtitleFont } from "shared/constants/fonts";
import { useNavigate } from "react-router-dom";
import {
  ValidationErrorMessages,
  checkPasswordsMatch,
  isEmailValid,
  isPaswordValid,
  validateIsEmpty,
} from "common/utils/validations";
import { ResponseData, UserType } from "common/types";
import { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "api/requests/auth/postRegister";
import { debounce } from "common/helpers/debounce";
import { showToastError, showToastSuccess } from "common/utils/toast";

export const RegisterPage: FC = memo(() => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const validateEmail = () => {
    const isValid = isEmailValid(email);
    if (!isValid) {
      setEmailError(ValidationErrorMessages.ValidEmailRequired);
    }
    return isValid;
  };

  const validatePassword = () => {
    const isValid = isPaswordValid(password);
    if (!isValid) {
      setPasswordError(ValidationErrorMessages.ValidPasswordRequired);
    }
    return isValid;
  };

  const validateName = () => {
    const isValid = validateIsEmpty(name);
    if (!isValid) {
      setNameError(ValidationErrorMessages.FieldRequired);
    }
    return isValid;
  };

  const validateRepeatPassword = () => {
    const isValid = validateIsEmpty(repeatPassword);
    if (!isValid) {
      setRepeatPasswordError(ValidationErrorMessages.FieldRequired);
      return isValid;
    }

    const passwordsMatch = checkPasswordsMatch(password, repeatPassword);
    if (!passwordsMatch) {
      setRepeatPasswordError(ValidationErrorMessages.PasswordsNotMatch);
    }
    return isValid;
  };

  const validatePhoneNumber = () => {
    const isValid = validateIsEmpty(phoneNumber);
    if (!isValid) {
      setPhoneNumberError(ValidationErrorMessages.FieldRequired);
    }
    return isValid;
  };

  const validateAll = (): boolean => {
    const emailValid = validateEmail();
    const nameValid = validateName();
    const passwordValid = validatePassword();
    const repeatPasswordValid = validateRepeatPassword();
    const phoneNumberValid = validatePhoneNumber();

    return (
      emailValid &&
      passwordValid &&
      nameValid &&
      repeatPasswordValid &&
      phoneNumberValid
    );
  };

  const fetchFunc = useCallback(async () => {
    const params = {
      name,
      email,
      password,
      phone_number: phoneNumber,
    };
    return await postRegister(params);
  }, [name, email, password, phoneNumber]);

  const { mutate } = useMutation<AxiosResponse<ResponseData<UserType>>>({
    mutationFn: () => debounce(fetchFunc(), 500),
    onSuccess: (axiosResponse) => {
      if (!axiosResponse) {
        showToastError("Internal server error");
      }

      const { error, data } = axiosResponse?.data ?? {};

      if (error) {
        showToastError(data?.message || "Internal server error");
      }

      if (!data.id) {
        return;
      }

      showToastSuccess("Registered successfully");
      navigate(PagePath.Login);
    },
    onError: (err: Error) => {
      console.log(err);
      showToastError("Internal server error");
    },
  });

  const handleSubmit = () => {
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
            padding: "1rem 0 2rem",
          }}
        >
          <Container
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "auto",
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
                  xs: "7rem",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ flex: "1 1 0" }}>
                  <CustomInput
                    placeholder="Name"
                    onFocus={() => {
                      setNameError("");
                    }}
                    onBlur={validateName}
                    onChange={(newName) => setName(newName as string)}
                    error={nameError}
                    value={name}
                  />
                </Box>
                <Box sx={{ flex: "1 1 0", marginLeft: "25px" }}>
                  <CustomInput
                    placeholder="Mobile phone"
                    onFocus={() => {
                      setPhoneNumberError("");
                    }}
                    onBlur={validatePhoneNumber}
                    onChange={(newPhoneNumber) =>
                      setPhoneNumber(newPhoneNumber as string)
                    }
                    error={phoneNumberError}
                    value={phoneNumber}
                  />
                </Box>
              </Box>
              <CustomInput
                sx={{ marginTop: "30px" }}
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
              <CustomInput
                sx={{ marginTop: "30px" }}
                placeholder="Repeat password"
                onFocus={() => {
                  setRepeatPasswordError("");
                }}
                onBlur={validateRepeatPassword}
                onChange={(newRepeatPassword) =>
                  setRepeatPassword(newRepeatPassword as string)
                }
                error={repeatPasswordError}
                value={repeatPassword}
                type="password"
              />
              <Box
                sx={{
                  marginTop: "30px",
                }}
              >
                <CustomButton
                  onClick={handleSubmit}
                  title="Register"
                  theme={ButtonTheme.Dark}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: {
                    sm: "10rem",
                    xs: "8rem",
                  },
                  flexDirection: {
                    sm: "row",
                    xs: "column",
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
                  Already have an account?
                </Typography>

                <CustomButton
                  onClick={() => navigate(PagePath.Login)}
                  title="Login"
                  theme={ButtonTheme.Transparent}
                />
              </Box>
            </Box>
          </Container>
        </LayoutImageBg>
      </Layout>
    </>
  );
});
