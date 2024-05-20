import { FC, memo, useCallback, useEffect, useState } from "react";
import { Layout } from "components/layout/Layout";
import { LayoutImageBg } from "components/layout/LayoutImageBg";
import { Box, Container, Rating, Typography } from "@mui/material";
import CreateReviewBg from "/assets/reviews/review_bg.png";
import { FaStar, FaRegStar } from "react-icons/fa";

import { ReviewType } from "./constants";

import { ResponseData } from "common/types";
import {
  ValidationErrorMessages,
  validateIsEmpty,
} from "common/utils/validations";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";
import { showToastError, showToastSuccess } from "common/utils/toast";
import { useUserContext } from "common/hooks/userContext";
import { postReview } from "api/requests/reviews/postReviews";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { CustomInput } from "components/wrappers/CustomInput";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme } from "shared/constants";
import { CustomTextArea } from "components/wrappers/CustomTextArea";

export const CreateReviewPage: FC = memo(() => {
  const { accessToken, user } = useUserContext();

  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const [messageError, setMessageError] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const validateMessage = () => {
    const isValid = validateIsEmpty(message);
    if (!isValid) {
      setMessageError(ValidationErrorMessages.FieldRequired);
    }
    return isValid;
  };

  const validateAll = (): boolean => {
    const messageValid = validateMessage();

    return !!messageValid;
  };

  const fetchFunc = useCallback(async () => {
    const params = {
      message,
      rating: rating || 0,
    };
    return await postReview(params, accessToken);
  }, [message, rating, accessToken]);

  const { mutate } = useMutation<AxiosResponse<ResponseData<ReviewType>>>({
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

      showToastSuccess("Thank you for your opinion");
      setMessage("");
      setRating(0);
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
        <LayoutImageBg bgImage={CreateReviewBg} height="100vh" minHeight={true}>
          <Container
            maxWidth="xl"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <Box
              sx={{
                flex: "1 1 0",
              }}
            >
              <Box
                sx={{
                  width: "70%",
                  margin: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "50px",
                    fontFamily: TitleFont,
                  }}
                >
                  Write a Review
                </Typography>
                <Typography
                  sx={{
                    fontSize: "25px",
                    fontFamily: SubtitleFont,
                    marginTop: "1rem",
                  }}
                >
                  We are very pleased that you are willing to share your
                  experience of flying with us
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                flex: "1 1 0",
              }}
            >
              <Box
                sx={{
                  width: "70%",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <CustomInput
                  value={user?.name}
                  readOnly={true}
                  placeholder="Name"
                />
                <Rating
                  name="simple-controlled"
                  size="large"
                  value={rating}
                  onChange={(_, newRating) => {
                    setRating(newRating);
                  }}
                  sx={{
                    fontSize: "5rem",
                    marginTop: "2rem",
                    "& .MuiRating-icon": {
                      width: "5rem",
                    },
                  }}
                  icon={<FaStar size={50} />}
                  emptyIcon={<FaRegStar size={50} />}
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
