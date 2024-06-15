import { FC, memo, useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, TOTAL_SEATS_AMOUNT } from "shared/constants";
import { SubtitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { ElementProps } from "../TicketCreationPanel";
import { PLANE_SEATS_LEGEND } from "../constants";
import { PassengerInfoType } from "../types";
import { PassengerCard } from "./PassengerCard";
import { DesktopPlaneScheme } from "./DesktopPlaneScheme";
import PlanePhoto from "/assets/flights/plane.png";
import { CABIN_CLASSES } from "pages/flights/constants";
import { MobilePlaneScheme } from "./MobilePlaneScheme";

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
    const [passengerForSeat, setPassengerForSeat] = useState<
      PassengerInfoType | undefined
    >(passengers[0]);
    const passengerForSeatRef = useRef<HTMLDivElement>(null);
    const [planeCabinClass, setPlaneCabinClass] = useState<string>(
      flight?.cabin_class
    );
    const containerRef = useRef<HTMLDivElement>(null);

    const isPageLoaded = useRef(false);

    useEffect(() => {
      if (!isPageLoaded.current) {
        window.scrollTo(0, 0);
      }

      isPageLoaded.current = true;
    });

    const scrollContainer = () => {
      const container = containerRef.current;

      if (!passengerForSeat || window.innerWidth >= 1200) {
        container?.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        return;
      }

      container?.scrollTo({
        left:
          (passengerForSeatRef.current?.offsetLeft || 0) +
          (passengerForSeatRef.current?.offsetWidth || 0) +
          (window.innerWidth <= 440 ? 16 : 0),
        behavior: "smooth",
      });
    };

    const handleSeatChanged = (passengerIndex: number) => {
      const isValid = passengers?.every((passenger) => passenger?.seat);
      if (isValid) {
        return setPassengerForSeat(undefined);
      }
      const nextPassenger = passengers.find(
        (_, index) => index === passengerIndex + 1
      );
      if (!nextPassenger) {
        return setPassengerForSeat(undefined);
      }

      setPassengerForSeat(nextPassenger);
      return scrollContainer();
    };

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
          maxWidth: "1536px",
          margin: {
            md: "5rem auto",
            xs: "2rem auto",
          },
          padding: "0 1rem",
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            margin: "auto",
            marginBottom: {
              md: "8rem",
              xs: "2rem",
            },
            overflow: {
              lg: "unset",
              xs: "auto",
            },
            minHeight: "135px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: {
                lg: "flex",
                xs: "none",
              },
            }}
          >
            {passengers.map((passenger, index) => (
              <PassengerCard
                passenger={passenger}
                key={index}
                onClick={handlePassengerClick}
                passengerForSeat={passengerForSeat}
                passengerRef={
                  passengerForSeat?.cardId === passenger.cardId
                    ? passengerForSeatRef
                    : undefined
                }
              />
            ))}
          </Grid>
          <Box
            sx={{
              display: {
                lg: "none",
                xs: "flex",
              },
              width: "max-content",
            }}
          >
            {passengers.map((passenger, index) => (
              <Box
                key={index}
                sx={{
                  ...(index !== 0 && { marginLeft: "2rem" }),
                }}
              >
                <PassengerCard
                  passenger={passenger}
                  onClick={handlePassengerClick}
                  passengerForSeat={passengerForSeat}
                  passengerRef={
                    passengerForSeat?.cardId === passenger.cardId
                      ? passengerForSeatRef
                      : undefined
                  }
                />
              </Box>
            ))}
          </Box>
        </Box>

        {window.innerWidth <= 900 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {passengers.map((passenger, index) => (
              <Box
                key={index}
                sx={{
                  ...(index !== 0 && { marginLeft: "1rem" }),
                  width: "10px",
                  height: "10px",
                  borderRadius: "50px",
                  background: `rgba(111, 130, 170, ${
                    passengerForSeat?.cardId === passenger?.cardId
                      ? "0.9"
                      : "0.3"
                  })`,
                }}
              ></Box>
            ))}
          </Box>
        )}

        <Box
          sx={{
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
            <br />
            You can also use the airplane below to see the seat layout.
          </Typography>
        </Box>

        <Box
          sx={{
            margin: "auto",
            display: "flex",
            alignItems: "baseline",
            flexDirection: {
              sm: "row",
              xs: "column",
            },
          }}
        >
          {PLANE_SEATS_LEGEND.map(({ title, color }, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "3rem",
                ...(index !== 0 && { marginTop: "1rem" }),
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

        <Box
          sx={{
            maxWidth: "600px",
            margin: {
              md: "0 auto 4rem",
              xs: "1rem auto 3rem",
            },
            position: "relative",
          }}
        >
          <img height="100%" width="100%" src={PlanePhoto} />
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              width: "70%",
              right: "15%",
              height: "30%",
              bottom: "15%",
              position: "absolute",
            }}
          >
            {CABIN_CLASSES.map((cabinClass) => (
              <Button
                onClick={() => setPlaneCabinClass(cabinClass.value)}
                sx={{
                  minWidth: "auto",
                  width: `${(cabinClass?.rows * 100) / TOTAL_SEATS_AMOUNT}%`,
                  background:
                    flight?.cabin_class === cabinClass.value
                      ? "#0086f3"
                      : "#e4ecf8",
                  opacity: 0.8,
                  borderRadius: "10px",

                  "&:hover": {
                    background:
                      flight?.cabin_class === cabinClass.value
                        ? "#0086f3"
                        : "#e4ecf8",

                    border: "1px solid #0086f3",
                  },

                  ...(planeCabinClass === cabinClass.value && {
                    border: "1px solid #0086f3",
                  }),
                }}
                key={cabinClass?.value}
              ></Button>
            ))}
          </Box>
        </Box>

        <DesktopPlaneScheme
          passengers={passengers}
          setPassengers={setPassengers}
          seats={seats}
          flight={flight}
          availableSeats={availableSeats}
          passengerForSeat={passengerForSeat}
          planeCabinClass={planeCabinClass}
          onSeatChanged={handleSeatChanged}
        />

        <MobilePlaneScheme
          passengers={passengers}
          setPassengers={setPassengers}
          seats={seats}
          flight={flight}
          availableSeats={availableSeats}
          passengerForSeat={passengerForSeat}
          planeCabinClass={planeCabinClass}
          onSeatChanged={handleSeatChanged}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "500px",
            margin: {
              md: "8rem auto 0",
              xs: "5rem auto 0",
            },

            "@media (max-width: 375px)": {
              flexDirection: "column",
            },
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
