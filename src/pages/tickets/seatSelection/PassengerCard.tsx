import { FC, RefObject, memo, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { PassengerInfoType } from "../types";
import { setInnerWindowWidth } from "common/utils/browser";

interface PassengerCardProps {
  passenger: PassengerInfoType;
  onClick?: (value: PassengerInfoType) => void;
  passengerForSeat?: PassengerInfoType;
  passengerRef?: RefObject<HTMLDivElement>;
}

export const PassengerCard: FC<PassengerCardProps> = memo(
  ({ passenger, onClick, passengerForSeat, passengerRef }) => {
    const handlePassengerClick = (newPassenger: PassengerInfoType) => {
      onClick?.(newPassenger);
    };

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    useEffect(() => setInnerWindowWidth(setInnerWidth), []);

    return (
      <Grid
        item
        lg={4}
        sx={{
          height: {
            lg: "inherit",
            xs: "100%",
          },
        }}
      >
        <Box
          ref={passengerRef}
          onClick={() => handlePassengerClick(passenger)}
          sx={{
            width: {
              lg: "auto",
              xs: "350px",
            },
            cursor: "pointer",
            padding: "20px",
            background: `rgba(111, 130, 170, ${
              passengerForSeat?.cardId === passenger?.cardId ? "0.9" : "0.3"
            })`,
            borderRadius: "10px",
            ...(passengerForSeat?.cardId === passenger?.cardId && {
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.25)",
            }),

            "&:hover": {
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.25)",
            },

            height: {
              lg: "79%",
              xs: "74%",
            },

            "@media (max-width: 440px)": {
              width: `${innerWidth - 74}px`,
            },

            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                fontFamily: SubtitleFont,
                color:
                  passengerForSeat?.cardId === passenger?.cardId
                    ? "white"
                    : DarkColor,
                wordBreak: "break-all",
              }}
            >
              {passenger?.name} {passenger?.surname}
            </Typography>

            <Box
              sx={{
                marginLeft: "15px",
                padding: "0 10px",
                border: `1px solid ${
                  passengerForSeat?.cardId === passenger?.cardId
                    ? "white"
                    : DarkColor
                }`,
              }}
            >
              <Typography
                sx={{
                  fontSize: "22px",
                  fontFamily: SubtitleFont,
                  color:
                    passengerForSeat?.cardId === passenger?.cardId
                      ? "white"
                      : DarkColor,
                }}
              >
                {passenger?.parent ? "Child" : "Adult"}
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              marginTop: "10px",
              fontSize: "25px",
              fontFamily: TitleFont,
              fontWeight: "500",
              color:
                passengerForSeat?.cardId === passenger?.cardId
                  ? "white"
                  : DarkColor,
            }}
          >
            Seat:{" "}
            {passenger?.seat
              ? `${passenger?.seat?.row}${passenger?.seat?.column}`
              : "..."}
          </Typography>
        </Box>
      </Grid>
    );
  }
);
