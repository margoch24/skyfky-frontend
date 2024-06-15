import { FC, memo } from "react";
import { Box, Typography } from "@mui/material";
import { DarkColor } from "shared/constants/colors";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { FlightType } from "../types";
import { getFormattedFullDate } from "common/helpers";

interface DatesComponentProps {
  flight?: FlightType;
}

export const DatesComponent: FC<DatesComponentProps> = memo(({ flight }) => {
  const arrival = flight?.arrival
    ? getFormattedFullDate(flight?.arrival)
    : null;
  const departure = flight?.departure
    ? getFormattedFullDate(flight?.departure)
    : null;

  return (
    <Box>
      {departure && arrival && (
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
            Departure
          </Typography>
          <Typography
            sx={{
              fontFamily: TitleFont,
              fontWeight: 200,
              color: DarkColor,
              fontSize: "28px",
            }}
          >
            {departure.split(" ")[0]}
            {", "}
            <span style={{ fontWeight: 500 }}>{departure.split(" ")[1]}</span>
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
            Arrival
          </Typography>
          <Typography
            sx={{
              fontFamily: TitleFont,
              fontWeight: 200,
              color: DarkColor,
              fontSize: "28px",
            }}
          >
            {arrival.split(" ")[0]}
            {", "}
            <span style={{ fontWeight: 500 }}>{arrival.split(" ")[1]}</span>
          </Typography>
        </Box>
      )}
    </Box>
  );
});
