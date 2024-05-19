import { useQuery } from "@tanstack/react-query";
import { getFlight } from "api/requests/flights/getFlight";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";
import { useCustomUrlQuery } from "common/helpers/query";
import { ResponseData } from "common/types";
import { Layout } from "components/layout/Layout";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { FlightType, SeatType } from "./types";
import { Box, Container, Typography } from "@mui/material";
import { getImageHelper } from "common/helpers/getImage";
import FlightCardImg from "/assets/flights/flight_card_img.jpg";
import { DarkColor } from "shared/constants/colors";
import { ClipLoader } from "react-spinners";
import {
  SecondTitleFont,
  SubtitleFont,
  TitleFont,
} from "shared/constants/fonts";
import { CabinClassColors } from "./constants";
import { capitalizeFirstLetter } from "common/helpers";
import { DatesComponent } from "./components/DatesComponent";
import { PlacesComponent } from "./components/PlacesComponent";
import { PricesComponent } from "./components/PricesComponent";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, PagePath } from "shared/constants";
import { Divider } from "components/wrappers/Divider";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "common/hooks/userContext";

export const FlightPage: FC = memo(() => {
  const { search } = window.location;
  const { flight_id } = useCustomUrlQuery(search);
  const { user, isAdmin } = useUserContext();
  const navigate = useNavigate();
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchFunc = useCallback(async () => {
    window.scrollTo(0, 0);
    return await getFlight(flight_id as string);
  }, [flight_id]);

  const { data: axiosData, isLoading } = useQuery<
    AxiosResponse<ResponseData<FlightType>>
  >({
    queryKey: [flight_id],
    queryFn: () => debounce(fetchFunc(), 500),
    enabled: !!flight_id,
    refetchOnWindowFocus: false,
  });

  const flight = axiosData?.data?.data;

  useEffect(() => {
    if (((flight?.available_seats as SeatType[]) ?? []).length <= 0) {
      setErrorMessage(
        "Unfortunately, all tickets have been sold out for this flight"
      );
      setDisabledButton(true);
      return;
    }

    if (isAdmin) {
      setErrorMessage("Please log in as a user to book tickets");
      setDisabledButton(true);
      return;
    }

    setErrorMessage("");
    setDisabledButton(false);
  }, [flight?.available_seats, flight?.departure, isAdmin]);

  const cabinClassColor = CabinClassColors[flight?.cabin_class || ""];

  const handleClick = () => {
    if (!user) {
      return navigate(PagePath.Login);
    }

    navigate(PagePath.CreateTicket, { state: { flight } });
  };

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: "300px",
          backgroundColor: DarkColor,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "48px",
              fontFamily: SecondTitleFont,
              marginTop: "4rem",
            }}
          >
            Fly with Freedom and Comfort
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          minHeight: "650px",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              textAlign: "center",
              marginTop: "5rem",
            }}
          >
            <ClipLoader size={40} />
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  height: "450px",
                  minWidth: "650px",
                  marginTop: "-5rem",
                }}
              >
                <img
                  height="100%"
                  width="100%"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
                  }}
                  src={
                    flight?.photo
                      ? getImageHelper(flight?.photo)
                      : FlightCardImg
                  }
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                }}
              >
                <PlacesComponent flight={flight} />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <DatesComponent flight={flight} />

              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontFamily: SubtitleFont,
                    opacity: "60%",
                    color: DarkColor,
                    marginTop: "40px",
                  }}
                >
                  Airline
                </Typography>
                <Typography
                  sx={{
                    fontFamily: SubtitleFont,
                    color: DarkColor,
                    fontSize: "28px",
                  }}
                >
                  {flight?.airline}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "20px",
                    fontFamily: SubtitleFont,
                    opacity: "60%",
                    color: DarkColor,
                    marginTop: "40px",
                  }}
                >
                  Class
                </Typography>
                <Box
                  sx={{
                    border: `1px solid ${cabinClassColor}`,
                    padding: "5px 10px 0",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: TitleFont,
                      color: cabinClassColor,
                      fontSize: "20px",
                    }}
                  >
                    {capitalizeFirstLetter(flight?.cabin_class || "none")}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontFamily: SubtitleFont,
                    opacity: "60%",
                    color: DarkColor,
                    marginTop: "40px",
                  }}
                >
                  Total seats
                </Typography>
                <Typography
                  sx={{
                    fontFamily: TitleFont,
                    color: DarkColor,
                    fontSize: "28px",
                  }}
                >
                  {(flight?.seats ?? []).length}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "20px",
                    fontFamily: SubtitleFont,
                    opacity: "60%",
                    color: DarkColor,
                    marginTop: "40px",
                  }}
                >
                  Seats available
                </Typography>
                <Typography
                  sx={{
                    fontFamily: TitleFont,
                    color: DarkColor,
                    fontSize: "28px",
                  }}
                >
                  {((flight?.available_seats as SeatType[]) ?? []).length}
                </Typography>
              </Box>

              <PricesComponent flight={flight} />
            </Box>

            <Box
              sx={{
                margin: "5rem 0 5rem",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "darkred",
                  fontFamily: SubtitleFont,
                  marginBottom: "1rem",
                }}
              >
                {errorMessage}
              </Typography>
              <CustomButton
                disabled={disabledButton}
                onClick={handleClick}
                title="Book now"
                theme={ButtonTheme.Dark}
              />
            </Box>
          </Box>
        )}
      </Container>
      <Divider />
    </Layout>
  );
});
