import { FC, memo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { DarkColor } from "shared/constants/colors";
import { SubtitleFont } from "shared/constants/fonts";
import { FlightType } from "pages/flights/types";
import { getMapboxPlaces } from "api/requests/flights/getMapboxPlaces";
import { useQuery } from "@tanstack/react-query";
import { MapboxResponse } from "common/types";
import { AxiosResponse } from "axios";
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
        marginTop: "15px",
      }}
    >
      <Typography
        sx={{
          fontSize: "22px",
          fontFamily: SubtitleFont,
          color: DarkColor,
        }}
      >
        <span
          style={{
            fontSize: "18px",
            opacity: "60%",
          }}
        >
          From:
        </span>{" "}
        {fromCountry?.text_en},{" "}
        <span
          style={{
            opacity: "60%",
          }}
        >
          {from?.text}
        </span>
      </Typography>
      <Typography
        sx={{
          fontSize: "22px",
          fontFamily: SubtitleFont,
          color: DarkColor,
        }}
      >
        <span
          style={{
            fontSize: "18px",
            opacity: "60%",
          }}
        >
          To:
        </span>{" "}
        {toCountry?.text_en},{" "}
        <span
          style={{
            opacity: "60%",
          }}
        >
          {to?.text}
        </span>
      </Typography>
    </Box>
  );
});
