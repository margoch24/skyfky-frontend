import { FC, memo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { DarkColor } from "shared/constants/colors";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { FlightType } from "pages/flights/types";
import { getMapboxPlaces } from "api/requests/flights/getMapboxPlaces";
import { useQuery } from "@tanstack/react-query";
import { MapboxResponse } from "common/types";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";

interface TicketCardPlacesProps {
  flight?: FlightType;
}

export const TicketCardPlaces: FC<TicketCardPlacesProps> = memo(
  ({ flight }) => {
    const fetchFromFunc = useCallback(async () => {
      return await getMapboxPlaces({
        longitude: flight?.from_longitude,
        latitude: flight?.from_latitude,
      });
    }, [flight]);

    const { data: fromAxiosData } = useQuery<AxiosResponse<MapboxResponse>>({
      queryKey: [flight?.id + "from"],
      queryFn: () => debounce(fetchFromFunc(), 500),
      refetchOnWindowFocus: false,
    });

    const fetchToFunc = useCallback(async () => {
      return await getMapboxPlaces({
        longitude: flight?.to_longitude,
        latitude: flight?.to_latitude,
      });
    }, [flight]);

    const { data: toAxiosData } = useQuery<AxiosResponse<MapboxResponse>>({
      queryKey: [flight?.id + "to"],
      queryFn: () => debounce(fetchToFunc(), 500),
      refetchOnWindowFocus: false,
    });

    const [from] = fromAxiosData?.data?.features ?? [];
    const fromCountry = from?.context?.find((value) =>
      value?.id.includes("country")
    );

    const [to] = toAxiosData?.data?.features ?? [];
    const toCountry = to?.context?.find((value) =>
      value?.id.includes("country")
    );

    return (
      <Box
        sx={{
          marginTop: "15px",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: SubtitleFont,
              color: DarkColor,
              opacity: "30%",
              fontSize: "16px",
            }}
          >
            From
          </Typography>
          <Typography
            sx={{
              fontFamily: SubtitleFont,
              fontSize: "22px",
              color: DarkColor,
            }}
          >
            {fromCountry?.text_en},{" "}
            <span
              style={{
                fontWeight: 200,
                fontFamily: TitleFont,
                fontSize: "18px",
              }}
            >
              {from?.text}
            </span>
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontFamily: SubtitleFont,
              color: DarkColor,
              opacity: "30%",
              fontSize: "16px",
            }}
          >
            To
          </Typography>
          <Typography
            sx={{
              fontFamily: SubtitleFont,
              fontSize: "22px",
              color: DarkColor,
            }}
          >
            {toCountry?.text_en},{" "}
            <span
              style={{
                fontWeight: 200,
                fontFamily: TitleFont,
                fontSize: "18px",
              }}
            >
              {to?.text}
            </span>
          </Typography>
        </Box>
      </Box>
    );
  }
);
