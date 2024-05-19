import { FC, memo, useCallback, useState } from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { FlightType } from "./types";
import { getImageHelper } from "common/helpers/getImage";
import FlightCardImg from "/assets/flights/flight_card_img.jpg";
import FlightArrow from "/assets/flights/flight_arrow.svg";

import Star from "/assets/star.png";

import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { CabinClassColors } from "./constants";
import { capitalizeFirstLetter } from "common/helpers";
import { DarkColor } from "shared/constants/colors";
import { CurrencyToSign, PagePath } from "shared/constants";
import { FaArrowRightLong } from "react-icons/fa6";
import { getMapboxPlaces } from "api/requests/flights/getMapboxPlaces";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { MapboxResponse } from "common/types";
import { debounce } from "common/helpers/debounce";
import { useNavigate } from "react-router-dom";

export const FlightCard: FC<{
  sx?: SxProps;
  flight: FlightType;
  lastCardRef?: (node?: Element | null) => void;
}> = memo(({ sx, flight, lastCardRef }) => {
  const navigate = useNavigate();
  const cabinClassColor = CabinClassColors[flight.cabin_class];
  const arrival = new Date(flight.arrival).toLocaleString("lt");
  const departure = new Date(flight.departure).toLocaleString("lt");

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const fetchFromFunc = useCallback(async () => {
    return await getMapboxPlaces({
      longitude: flight.from_longitude,
      latitude: flight.from_latitude,
    });
  }, [flight]);

  const { data: fromAxiosData } = useQuery<AxiosResponse<MapboxResponse>>({
    queryKey: [flight.id + "from"],
    queryFn: () => debounce(fetchFromFunc(), 500),
    refetchOnWindowFocus: false,
  });

  const fetchToFunc = useCallback(async () => {
    return await getMapboxPlaces({
      longitude: flight.to_longitude,
      latitude: flight.to_latitude,
    });
  }, [flight]);

  const { data: toAxiosData } = useQuery<AxiosResponse<MapboxResponse>>({
    queryKey: [flight.id + "to"],
    queryFn: () => debounce(fetchToFunc(), 500),
    refetchOnWindowFocus: false,
  });

  const [from] = fromAxiosData?.data?.features ?? [];
  const fromCountry = from?.context?.find((value) =>
    value?.id.includes("country")
  );

  const [to] = toAxiosData?.data?.features ?? [];
  const toCountry = to?.context?.find((value) => value?.id.includes("country"));

  return (
    <Box
      ref={lastCardRef}
      sx={{
        width: "350px",
        height: "550px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        ...sx,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`${PagePath.Flight}?flight_id=${flight.id}`)}
    >
      <Box
        sx={{
          height: "40%",
          width: "100%",
        }}
      >
        <img
          height="100%"
          width="100%"
          src={flight.photo ? getImageHelper(flight.photo) : FlightCardImg}
        />
      </Box>

      <Box
        sx={{
          margin: "25px 25px 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              fontFamily: SubtitleFont,
              fontSize: "18px",
              color: DarkColor,
              opacity: "60%",
              flex: "1 1 0",
              minWidth: "fit-content",
            }}
          >
            {fromCountry?.text_en?.toUpperCase()}
          </Typography>

          <img
            style={{ flex: "1 1 0" }}
            height="30px"
            width="30px"
            src={FlightArrow}
          />

          <Typography
            sx={{
              fontFamily: SubtitleFont,
              fontSize: "18px",
              color: DarkColor,
              flex: "1 1 0",
              minWidth: "fit-content",
            }}
          >
            {toCountry?.text_en?.toUpperCase()}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              border: `1px solid ${cabinClassColor}`,
              width: "150px",
              paddingTop: "5px",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: TitleFont,
                fontSize: "18px",
                color: cabinClassColor,
              }}
            >
              {capitalizeFirstLetter(flight.cabin_class)}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#DCDCDC",
              width: "fit-content",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 7px",
            }}
          >
            <Typography
              sx={{
                fontFamily: TitleFont,
                fontSize: "18px",
                marginRight: "5px",
                marginTop: "6px",
              }}
            >
              {flight.score}
            </Typography>
            <img height="20px" width="20px" src={Star} />
          </Box>
        </Box>

        <Typography
          sx={{
            fontFamily: SubtitleFont,
            fontSize: "16px",
            color: DarkColor,
            marginTop: "15px",
            textAlign: "left",
            opacity: "50%",
          }}
        >
          Departure
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontFamily: TitleFont,
              fontSize: "23px",
              color: DarkColor,
              fontWeight: "200",
            }}
          >
            {departure.split(" ")[0]}
          </Typography>

          <Typography
            sx={{
              fontFamily: TitleFont,
              fontSize: "23px",
              color: DarkColor,
              fontWeight: "200",
              opacity: "60%",
            }}
          >
            {departure.split(" ")[1]}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: SubtitleFont,
            fontSize: "16px",
            color: DarkColor,
            textAlign: "left",
            opacity: "50%",
          }}
        >
          Arrival
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontFamily: TitleFont,
              fontSize: "23px",
              color: DarkColor,
              fontWeight: "200",
            }}
          >
            {arrival.split(" ")[0]}
          </Typography>

          <Typography
            sx={{
              fontFamily: TitleFont,
              fontSize: "23px",
              color: DarkColor,
              fontWeight: "200",
              opacity: "60%",
            }}
          >
            {arrival.split(" ")[1]}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: TitleFont,
            fontSize: "23px",
            color: DarkColor,
            fontWeight: "600",
            marginTop: "7px",
            textAlign: "center",
          }}
        >
          {flight.price} {CurrencyToSign[flight.currency]}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: SubtitleFont,
              fontSize: "18px",
              color: DarkColor,
              marginRight: "20px",
            }}
          >
            Detailed view
          </Typography>

          <Box
            sx={{
              width: "fit-content",
              marginTop: "5px",
              transition: "all 100ms ease-in-out",
              ...(isHovered && { transform: "translateX(10px)" }),
            }}
          >
            <FaArrowRightLong color={DarkColor} size={20} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});