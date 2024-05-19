import { FC, memo } from "react";
import { Box, Typography } from "@mui/material";
import { DarkColor } from "shared/constants/colors";
import { SubtitleFont } from "shared/constants/fonts";
import { FlightType } from "pages/flights/types";

interface DatesComponentProps {
  flight?: FlightType;
}

export const DatesComponent: FC<DatesComponentProps> = memo(({ flight }) => {
  const arrival = flight?.arrival
    ? new Date(flight?.arrival).toLocaleString("lt")
    : null;
  const departure = flight?.departure
    ? new Date(flight?.departure).toLocaleString("lt")
    : null;

  return (
    <Box
      sx={{
        marginTop: "15px",
      }}
    >
      {departure && arrival && (
        <Box>
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
              Departure:
            </span>{" "}
            {departure.split(" ")[0]},{" "}
            <span
              style={{
                opacity: "60%",
              }}
            >
              {departure.split(" ")[1]}
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
              Arrival:
            </span>{" "}
            {arrival.split(" ")[0]},{" "}
            <span
              style={{
                opacity: "60%",
              }}
            >
              {arrival.split(" ")[1]}
            </span>
          </Typography>
        </Box>
      )}
    </Box>
  );
});
