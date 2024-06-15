import { FC, memo, useCallback, useState } from "react";
import { Box, Grid, SxProps, Typography } from "@mui/material";
import { FlightType } from "./types";
import { getImageHelper } from "common/helpers/getImage";
import FlightCardImg from "/assets/flights/flight_card_img.jpg";
import FlightArrow from "/assets/flights/flight_arrow.svg";

import Star from "/assets/star.png";

import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { CabinClassColors } from "./constants";
import { capitalizeFirstLetter, getFormattedFullDate } from "common/helpers";
import { DarkColor } from "shared/constants/colors";
import { CurrencyEnum, CurrencyToSign, PagePath } from "shared/constants";
import { FaArrowRightLong } from "react-icons/fa6";
import { getMapboxPlaces } from "api/requests/flights/getMapboxPlaces";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  DiscountType,
  MapboxResponse,
  QueryKeys,
  ResponseData,
} from "common/types";
import { debounce } from "common/helpers/debounce";
import { useNavigate } from "react-router-dom";
import { useQueryContext } from "common/hooks/queryContext";
import { getDiscounts } from "api/requests/settings/getDiscounts";

export const FlightCard: FC<{
  sx?: SxProps;
  flight: FlightType;
  lastCardRef?: (node?: Element | null) => void;
}> = memo(({ sx, flight, lastCardRef }) => {
  const navigate = useNavigate();
  const { adultAmount, childAmount } = useQueryContext();

  const cabinClassColor = CabinClassColors[flight.cabin_class];
  const arrival = getFormattedFullDate(flight.arrival);
  const departure = getFormattedFullDate(flight.departure);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const fetchDiscountsFunc = useCallback(async () => {
    return await getDiscounts();
  }, []);

  const { data: discountsAxiosData } = useQuery<
    AxiosResponse<ResponseData<DiscountType[]>>
  >({
    queryKey: [QueryKeys.GetDiscounts],
    queryFn: () => debounce(fetchDiscountsFunc(), 500),
    refetchOnWindowFocus: false,
  });

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

  const discounts = discountsAxiosData?.data?.data ?? [];
  const childDiscount = discounts?.find(
    (discount) => discount.key === "ticket_child_discount"
  );
  const adultsPrice = (flight?.price || 0) * (adultAmount || 1);
  const childrenPrice =
    (flight?.price || 0) * (childAmount || 0) * Number(childDiscount?.value);

  const currency = CurrencyToSign[flight?.currency || CurrencyEnum.EUR];

  return (
    <Box
      ref={lastCardRef}
      sx={{
        position: "relative",
        height: "100%",
        maxWidth: "350px",
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
          height: "200px",
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
          padding: "25px",
        }}
      >
        <Grid
          sx={{
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
          spacing={0.2}
          container
        >
          <Grid item>
            <Typography
              sx={{
                fontFamily: SubtitleFont,
                fontSize: "18px",
                color: DarkColor,
                opacity: "60%",
                minWidth: "fit-content",
              }}
            >
              {fromCountry?.text_en?.toUpperCase()}
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              margin: "0 5px",
            }}
          >
            <img height="30px" width="30px" src={FlightArrow} />
          </Grid>

          <Grid item>
            <Typography
              sx={{
                fontFamily: SubtitleFont,
                fontSize: "18px",
                color: DarkColor,
                minWidth: "fit-content",
              }}
            >
              {toCountry?.text_en?.toUpperCase()}
            </Typography>
          </Grid>
        </Grid>

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
              marginLeft: "10px",
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
            marginBottom: "1rem",
          }}
        >
          {adultsPrice + childrenPrice || adultsPrice} {currency}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "10px",
            transform: "translateX(-50%)",
            left: "50%",
          }}
        >
          <Typography
            sx={{
              fontFamily: SubtitleFont,
              fontSize: "18px",
              color: DarkColor,
              marginRight: "20px",
              width: "max-content",
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
