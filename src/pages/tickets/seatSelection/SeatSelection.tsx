import { FC, memo, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme } from "shared/constants";
import { SubtitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { ElementProps } from "../TicketCreationPanel";
import { PLANE_SEATS_LEGEND } from "../constants";
import { PassengerInfoType } from "../types";
import { PassengerCard } from "./PassengerCard";
import { DesktopPlaneScheme } from "./DesktopPlaneScheme";

export const SeatSelection: FC<ElementProps> = memo(
  ({
    onNext,
    onPrevious,
    seats,
    flight,
    passengers,
    setPassengers,
    availableSeats,
  }) => {
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const [passengerForSeat, setPassengerForSeat] = useState<PassengerInfoType>(
      passengers[0]
    );

    const handleNext = () => {
      onNext?.();
    };
    const handlePrevious = () => {
      onPrevious?.();
    };

    const handlePassengerClick = (newPassenger: PassengerInfoType) => {
      setPassengerForSeat(newPassenger);
    };

    useEffect(() => {
      const isValid = passengers?.every((passenger) => passenger?.seat);
      setDisabledButton(!isValid);
    }, [passengers]);

    return (
      <Box
        sx={{
          marginTop: "5rem",
          minWidth: "1536px",
        }}
      >
        <Box
          sx={{
            width: "1536px",
            margin: "auto",
            marginBottom: "8rem",
          }}
        >
          <Grid container spacing={3}>
            {passengers.map((passenger, index) => (
              <PassengerCard
                passenger={passenger}
                key={index}
                onClick={handlePassengerClick}
                passengerForSeat={passengerForSeat}
              />
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            width: "1536px",
            margin: "0 auto 1rem",
          }}
        >
          <Typography
            sx={{
              color: DarkColor,
              opacity: "40%",
              fontSize: "16px",
              fontFamily: SubtitleFont,
              fontStyle: "italic",
            }}
          >
            *First, click on the passenger for whom you want to choose a seat.
            Then, click on an available seat below.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "1536px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          {PLANE_SEATS_LEGEND.map(({ title, color }, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "3rem",
              }}
            >
              <Box
                sx={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: color,
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              ></Box>
              <Typography
                sx={{
                  fontFamily: SubtitleFont,
                  color: DarkColor,
                  fontSize: "18px",
                }}
              >
                {title}
              </Typography>
            </Box>
          ))}
        </Box>

        <DesktopPlaneScheme
          passengers={passengers}
          setPassengers={setPassengers}
          seats={seats}
          flight={flight}
          availableSeats={availableSeats}
          passengerForSeat={passengerForSeat}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "500px",
            margin: "8rem auto 0",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <CustomButton
              onClick={handlePrevious}
              title="Previous"
              theme={ButtonTheme.Dark}
            />
          </Box>

          <Box
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <CustomButton
              disabled={disabledButton}
              onClick={handleNext}
              title="Next"
              theme={ButtonTheme.Dark}
              sx={{
                padding: "0 55px",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }
);
