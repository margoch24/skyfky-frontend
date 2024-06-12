import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { Layout } from "components/layout/Layout";
import { LayoutImageBg } from "components/layout/LayoutImageBg";
import { Box, Container, Typography } from "@mui/material";
import CreateFlightBg from "/assets/flights/create_flight_bg.png";

import { ResponseData } from "common/types";
import {
  ValidationErrorMessages,
  isEmailValid,
  validateIsEmpty,
} from "common/utils/validations";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";
import { showToastError, showToastSuccess } from "common/utils/toast";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { CustomInput } from "components/wrappers/CustomInput";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme } from "shared/constants";
import { CustomTextArea } from "components/wrappers/CustomTextArea";
import { ContactUsType } from "./constants";
import { postContactUs } from "api/requests/contact_us/postContactUs";

export const ContactUsPage: FC = memo(() => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [messageError, setMessageError] = useState("");

  const isPageLoaded = useRef(false);

  useEffect(() => {
    if (!isPageLoaded.current) {
      window.scrollTo(0, 0);
    }

    isPageLoaded.current = true;
  });

  const fetchFunc = useCallback(async () => {
    const params = {
      name,
      email,
      phone_number: phoneNumber,
      message,
    };
    return await postContactUs(params);
  }, [name, email, phoneNumber, message]);

  const { mutate } = useMutation<AxiosResponse<ResponseData<ContactUsType>>>({
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

      showToastSuccess("We will contact you soon");
      setName("");
      setEmail("");
      setPhoneNumber("");
      setMessage("");
    },
    onError: (err: Error) => {
      console.log(err);
      showToastError("Internal server error");
    },
  });

  const validateEmail = () => {
    const isValid = isEmailValid(email);
    if (!isValid) {
      setEmailError(ValidationErrorMessages.ValidEmailRequired);
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

  const validatePhoneNumber = () => {
    const isValid = validateIsEmpty(phoneNumber);
    if (!isValid) {
      setPhoneNumberError(ValidationErrorMessages.FieldRequired);
    }
    return isValid;
  };

  const validateMessage = () => {
    const isValid = validateIsEmpty(message);
    if (!isValid) {
      setMessageError(ValidationErrorMessages.FieldRequired);
    }
    return isValid;
  };

  const validateAll = (): boolean => {
    const emailValid = validateEmail();
    const nameValid = validateName();
    const phoneNumberValid = validatePhoneNumber();
    const messageValid = validateMessage();

    return emailValid && nameValid && phoneNumberValid && messageValid;
  };

  const handleSubmit = () => {
    if (!validateAll()) return;

    mutate();
  };

  return (
    <>
      <Layout>
        <LayoutImageBg
          bgImage={CreateFlightBg}
          sx={{
            minHeight: "100vh",
            justifyContent: "center",
            padding: "4rem 0",

            "@media (max-width: 1024px) and (max-height: 1000px)": {
              padding: "10rem 0",
            },
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: {
                md: "row",
                xs: "column",
              },
              alignItems: "baseline",
            }}
          >
            <Box
              sx={{
                flex: "1 1 0",
                textAlign: {
                  md: "left",
                  xs: "center",
                },
                marginBottom: {
                  md: 0,
                  xs: "5rem",
                },
              }}
            >
              <Box
                sx={{
                  width: {
                    md: "70%",
                    xs: "100%",
                  },
                  margin: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "50px",
                    fontFamily: TitleFont,
                  }}
                >
                  Let’s Talk
                </Typography>
                <Typography
                  sx={{
                    fontSize: "25px",
                    fontFamily: SubtitleFont,
                    marginTop: "1rem",
                  }}
                >
                  Write if you have any questions or problems. We are always
                  happy to help you.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                flex: "1 1 0",
                margin: {
                  md: "",
                  xs: "auto",
                },
                "@media (max-width: 400px)": {
                  width: "100%",
                },
              }}
            >
              <Box
                sx={{
                  width: {
                    lg: "70%",
                    xs: "100%",
                  },
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "space-between",

                    "@media (max-width: 400px)": {
                      display: "block",
                    },
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
                  <Box
                    sx={{
                      flex: "1 1 0",
                      "@media (max-width: 400px)": {
                        marginLeft: 0,
                        marginTop: "25px",
                      },
                      marginLeft: "25px",
                    }}
                  >
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
                <CustomTextArea
                  sx={{
                    marginTop: "2rem",
                  }}
                  placeholder="Message"
                  onFocus={() => {
                    setMessageError("");
                  }}
                  onBlur={validateMessage}
                  onChange={(newMessage) => setMessage(newMessage as string)}
                  error={messageError}
                  value={message}
                />
                <CustomButton
                  onClick={handleSubmit}
                  sx={{
                    marginTop: "2rem",
                  }}
                  title="Submit"
                  theme={ButtonTheme.Dark}
                />
              </Box>
            </Box>
          </Container>
        </LayoutImageBg>
      </Layout>
    </>
  );
});
