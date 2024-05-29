import { FC, memo, useCallback } from "react";

import { Box, Container, Typography } from "@mui/material";
import { TitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, PagePath } from "shared/constants";
import { getFlights } from "api/requests/flights/getFlights";
import { useQuery } from "@tanstack/react-query";
import { FlightType } from "pages/flights/types";
import { QueryKeys, ResponseData } from "common/types";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";
import { FlightCard } from "pages/flights/FlightCard";
import { Carousel } from "components/wrappers/Carousel";
import { useNavigate } from "react-router-dom";

export const PopularFlights: FC = memo(() => {
  const navigate = useNavigate();

  const fetchFunc = useCallback(async () => {
    const params = {
      limit: 9,
    };
    return await getFlights(params);
  }, []);

  const { data: axiosResponse } = useQuery<
    AxiosResponse<ResponseData<FlightType[]>>
  >({
    queryKey: [QueryKeys.GetFlights],
    queryFn: () => debounce(fetchFunc(), 500),
    refetchOnWindowFocus: false,
  });

  const flights: FlightType[] = axiosResponse?.data?.data ?? [];

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: DarkColor,
            fontFamily: TitleFont,
            fontSize: "30px",
          }}
        >
          Our popular <b>flights</b>
        </Typography>

        {flights?.length > 0 && (
          <Box
            sx={{
              margin: "60px 0",
            }}
          >
            <Carousel>
              {flights?.map((flight) => (
                <FlightCard
                  sx={{
                    margin: "0 auto",
                  }}
                  flight={flight}
                  key={flight?.id}
                />
              ))}
            </Carousel>
          </Box>
        )}

        <CustomButton
          onClick={() => navigate(PagePath.Flights)}
          title="Search More"
          theme={ButtonTheme.Transparent}
        />
      </Container>
    </>
  );
});
