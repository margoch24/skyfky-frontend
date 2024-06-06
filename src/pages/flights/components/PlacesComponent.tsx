import { FC, memo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { DarkColor } from "shared/constants/colors";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { FlightType } from "../types";
import { getMapboxPlaces } from "api/requests/flights/getMapboxPlaces";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { MapboxResponse } from "common/types";
import { debounce } from "common/helpers/debounce";

interface PlacesComponentProps {
  flight?: FlightType;
}

export const PlacesComponent: FC<PlacesComponentProps> = memo(({ flight }) => {
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
  const toCountry = to?.context?.find((value) => value?.id.includes("country"));

  return (
    <Box
      sx={{
        height: "fit-content",
        maxWidth: "650px",
        marginLeft: "auto",
        marginRight: {
          md: "inherit",
          xs: "auto",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontFamily: SubtitleFont,
          opacity: "60%",
          color: DarkColor,
        }}
      >
        From
      </Typography>

      <Typography
        sx={{
          fontSize: "28px",
          fontFamily: SubtitleFont,
          color: DarkColor,
        }}
      >
        {fromCountry?.text_en},{" "}
        <span
          style={{
            fontFamily: TitleFont,
            fontWeight: 200,
          }}
        >
          {from?.text}
        </span>
      </Typography>

      <Typography
        sx={{
          fontSize: "16px",
          fontFamily: TitleFont,
          fontWeight: 200,
          color: DarkColor,
        }}
      >
        Full address: {from?.place_name_en}
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
        To
      </Typography>

      <Typography
        sx={{
          fontSize: "28px",
          fontFamily: SubtitleFont,
          color: DarkColor,
        }}
      >
        {toCountry?.text_en},{" "}
        <span
          style={{
            fontFamily: TitleFont,
            fontWeight: 200,
          }}
        >
          {to?.text}
        </span>
      </Typography>

      <Typography
        sx={{
          fontSize: "16px",
          fontFamily: TitleFont,
          fontWeight: 200,
          color: DarkColor,
        }}
      >
        Full address: {to?.place_name_en}
      </Typography>
    </Box>
  );
});
