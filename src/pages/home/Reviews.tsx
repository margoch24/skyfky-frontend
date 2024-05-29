import { FC, memo, useCallback } from "react";

import { Box, Container, Typography } from "@mui/material";
import { TitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, PagePath } from "shared/constants";
import { useNavigate } from "react-router-dom";
import { Carousel } from "components/wrappers/Carousel";
import { getReviews } from "api/requests/reviews/getReviews";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys, ResponseData } from "common/types";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";
import { ReviewType } from "pages/reviews/constants";
import { ReviewCard } from "pages/reviews/ReviewCard";

export const Reviews: FC = memo(() => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(PagePath.CreateReview);
  };

  const fetchFunc = useCallback(async () => {
    const params = {
      limit: 9,
    };
    return await getReviews(params);
  }, []);

  const { data: axiosResponse } = useQuery<
    AxiosResponse<ResponseData<ReviewType[]>>
  >({
    queryKey: [QueryKeys.GetReviews],
    queryFn: () => debounce(fetchFunc(), 500),
    refetchOnWindowFocus: false,
  });

  const reviews: ReviewType[] = axiosResponse?.data?.data ?? [];
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: DarkColor,
              fontFamily: TitleFont,
              fontSize: "30px",
              textAlign: {
                sm: "left",
                xs: "center",
              },
            }}
          >
            Opinions <b>matter</b>
          </Typography>

          {reviews?.length > 0 && (
            <Box
              sx={{
                margin: "60px 0",
              }}
            >
              <Carousel>
                {reviews?.map((review) => (
                  <ReviewCard
                    sx={{
                      margin: "0 auto",
                    }}
                    review={review}
                    key={review?.id}
                  />
                ))}
              </Carousel>
            </Box>
          )}

          <CustomButton
            onClick={handleClick}
            title="Share your opinion"
            theme={ButtonTheme.Transparent}
          />
        </Box>
      </Container>
    </>
  );
});
