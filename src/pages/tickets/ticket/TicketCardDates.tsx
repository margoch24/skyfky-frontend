import { FC, memo } from "react";
import { Box, Typography } from "@mui/material";
import { DarkColor } from "shared/constants/colors";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { FlightType } from "pages/flights/types";
import { getFormattedFullDate } from "common/helpers";

interface TicketCardDatesProps {
  flight?: FlightType;
}

export const TicketCardDates: FC<TicketCardDatesProps> = memo(({ flight }) => {
  const arrival = flight?.arrival
    ? getFormattedFullDate(flight?.arrival)
    : null;
  const departure = flight?.departure
    ? getFormattedFullDate(flight?.departure)
    : null;

  return (
    <Box
      sx={{
        marginTop: "15px",
      }}
    >
      {departure && arrival && (
        <Box>
          <Box>
            <Typography
              sx={{
                fontFamily: SubtitleFont,
                color: DarkColor,
                opacity: "30%",
                fontSize: "16px",
              }}
            >
              Departure
            </Typography>
            <Typography
              sx={{
                fontFamily: TitleFont,
                fontSize: "22px",
                color: DarkColor,
                marginTop: "5px",
              }}
            >
              {departure?.split(" ")[1]},{" "}
              <span
                style={{
                  fontWeight: 200,
                  fontSize: "18px",
                }}
              >
                {departure?.split(" ")[0]}
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
              Arrival
            </Typography>
            <Typography
              sx={{
                fontFamily: TitleFont,
                fontSize: "22px",
                color: DarkColor,
                marginTop: "1px",
              }}
            >
              {arrival?.split(" ")[1]},{" "}
              <span
                style={{
                  fontWeight: 200,
                  fontSize: "18px",
                }}
              >
                {arrival?.split(" ")[0]}
              </span>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
});
