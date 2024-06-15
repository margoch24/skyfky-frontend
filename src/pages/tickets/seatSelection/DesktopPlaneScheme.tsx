import { Dispatch, FC, SetStateAction, memo, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { TOTAL_SEATS_AMOUNT } from "shared/constants";
import { FlightType, SeatColumns, SeatType } from "pages/flights/types";
import TopPlane from "/assets/flights/top_plane.png";
import { DarkColor } from "shared/constants/colors";
import { CABIN_CLASSES } from "pages/flights/constants";
import { PassengerInfoType } from "../types";
import { TitleFont } from "shared/constants/fonts";

interface DesktopPlaneSchemeProps {
  passengerForSeat?: PassengerInfoType;
  passengers: PassengerInfoType[];
  setPassengers: Dispatch<SetStateAction<PassengerInfoType[]>>;
  seats: SeatType[];
  flight: FlightType;
  availableSeats: SeatType[];
  planeCabinClass: string;
  onSeatChanged?: (passengerIndex: number) => void;
}

export const DesktopPlaneScheme: FC<DesktopPlaneSchemeProps> = memo(
  ({
    passengerForSeat,
    passengers,
    setPassengers,
    seats,
    flight,
    availableSeats,
    planeCabinClass,
    onSeatChanged,
  }) => {
    const ButtonWidth = 43;
    const containerRef = useRef<HTMLDivElement>(null);
    const elementToScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!elementToScrollRef.current) {
        return;
      }
      const selectedOffsetLeft = elementToScrollRef.current.offsetLeft;
      const containerWidth = container?.clientWidth || 0;
      const selectedWidth = elementToScrollRef.current.clientWidth;

      const scrollPosition =
        selectedOffsetLeft - containerWidth / 2 + selectedWidth / 2;

      container?.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }, [planeCabinClass]);

    const handleSeatChange = (seat?: SeatType) => {
      if (!seat) {
        return;
      }

      const isSeatSelected = passengers.some(
        (passenger) => passenger?.seat?.id === seat.id
      );
      if (isSeatSelected) {
        return;
      }

      const passengerIndex = passengers.findIndex(
        (passenger) => passenger?.cardId === passengerForSeat?.cardId
      );
      if (passengerIndex === -1) {
        return;
      }

      onSeatChanged?.(passengerIndex);

      return setPassengers((prevPassengers) => {
        prevPassengers[passengerIndex].seat = seat;
        return [...prevPassengers];
      });
    };

    const seatButtonBackground = (seat?: SeatType) => {
      if (!seat) {
        return "#e4ecf8";
      }

      const isSeatSelected = passengers.some(
        (passenger) => passenger?.seat?.id === seat.id
      );

      if (isSeatSelected) {
        return "#c0ccdc";
      }

      const isSeatAvailable = availableSeats.find(
        (availableSeat) => availableSeat.id === seat.id
      );

      if (!isSeatAvailable) {
        return "#b2d9ff";
      }

      return "#0086f3";
    };

    const buttonDisabled = (seat?: SeatType) => {
      if (!seat) {
        return true;
      }

      const isSeatSelected = passengers.some(
        (passenger) => passenger?.seat?.id === seat.id
      );

      if (isSeatSelected) {
        return true;
      }

      const isSeatAvailable = availableSeats.find(
        (availableSeat) => availableSeat.id === seat.id
      );

      if (!isSeatAvailable) {
        return true;
      }

      return false;
    };

    return (
      <Box
        ref={containerRef}
        sx={{
          display: {
            md: "block",
            xs: "none",
          },
          overflow: "auto",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              minWidth: "300px",
              filter:
                "drop-shadow(0 0px 0 #e4ecf8) drop-shadow(-6px 0 0 #e4ecf8) drop-shadow(0 -3px 0 #e4ecf8)",
            }}
          >
            <img height="100%" width="100%" src={TopPlane} />
          </Box>
          <Box
            sx={{
              height: "300px",
              backgroundColor: "#f5f7fd",
              position: "relative",
              marginLeft: "auto",
              borderTop: "4px solid #e4ecf8",
              borderBottom: "4px solid #e4ecf8",
              borderRight: "4px solid #e4ecf8",
              padding: "0 20px 0 0",
              minWidth: "1450px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              {[...Array(TOTAL_SEATS_AMOUNT)].map((_, index) => {
                const ASeat = seats?.find(
                  (seat) =>
                    seat?.row === index + 1 && seat?.column === SeatColumns.A
                );
                const BSeat = seats?.find(
                  (seat) =>
                    seat?.row === index + 1 && seat?.column === SeatColumns.B
                );
                const CSeat = seats?.find(
                  (seat) =>
                    seat?.row === index + 1 && seat?.column === SeatColumns.C
                );
                const DSeat = seats?.find(
                  (seat) =>
                    seat?.row === index + 1 && seat?.column === SeatColumns.D
                );

                return (
                  <Box
                    sx={{
                      width: "48px",
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                    key={index}
                  >
                    <Box>
                      <Button
                        disabled={buttonDisabled(ASeat)}
                        sx={{
                          height: "45px",
                          backgroundColor: seatButtonBackground(ASeat),
                          minWidth: `${ButtonWidth}px`,
                          "&:hover": {
                            backgroundColor: "#c0ccdc",
                          },
                        }}
                        onClick={() => handleSeatChange(ASeat)}
                      >
                        {ASeat && (
                          <Typography
                            sx={{
                              fontFamily: TitleFont,
                              color: "white",
                              fontSize: "14px",
                            }}
                          >
                            {ASeat?.row}
                            {ASeat?.column}
                          </Typography>
                        )}
                      </Button>
                      <Button
                        disabled={buttonDisabled(BSeat)}
                        sx={{
                          height: "45px",
                          backgroundColor: seatButtonBackground(BSeat),
                          minWidth: `${ButtonWidth}px`,
                          marginTop: "10px",

                          "&:hover": {
                            backgroundColor: "#c0ccdc",
                          },
                        }}
                        onClick={() => handleSeatChange(BSeat)}
                      >
                        {BSeat && (
                          <Typography
                            sx={{
                              fontFamily: TitleFont,
                              color: "white",
                              fontSize: "14px",
                            }}
                          >
                            {BSeat?.row}
                            {BSeat?.column}
                          </Typography>
                        )}
                      </Button>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: TitleFont,
                        color: DarkColor,
                        fontSize: "16px",
                      }}
                    >
                      {index + 1}
                    </Typography>
                    <Box>
                      <Button
                        disabled={buttonDisabled(CSeat)}
                        sx={{
                          height: "45px",
                          backgroundColor: seatButtonBackground(CSeat),
                          minWidth: `${ButtonWidth}px`,

                          "&:hover": {
                            backgroundColor: "#c0ccdc",
                          },
                        }}
                        onClick={() => handleSeatChange(CSeat)}
                      >
                        {CSeat && (
                          <Typography
                            sx={{
                              fontFamily: TitleFont,
                              color: "white",
                              fontSize: "14px",
                            }}
                          >
                            {CSeat?.row}
                            {CSeat?.column}
                          </Typography>
                        )}
                      </Button>
                      <Button
                        disabled={buttonDisabled(DSeat)}
                        sx={{
                          height: "45px",
                          backgroundColor: seatButtonBackground(DSeat),
                          minWidth: `${ButtonWidth}px`,
                          marginTop: "10px",

                          "&:hover": {
                            backgroundColor: "#c0ccdc",
                          },
                        }}
                        onClick={() => handleSeatChange(DSeat)}
                      >
                        {DSeat && (
                          <Typography
                            sx={{
                              fontFamily: TitleFont,
                              color: "white",
                              fontSize: "14px",
                            }}
                          >
                            {DSeat?.row}
                            {DSeat?.column}
                          </Typography>
                        )}
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            marginLeft: "300px",
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            minWidth: "1450px",
          }}
        >
          {CABIN_CLASSES.map((cabinClass) => (
            <Typography
              sx={{
                width: `${(cabinClass?.rows * 100) / TOTAL_SEATS_AMOUNT}%`,
                textAlign: "center",
                fontSize: "20px",
                fontFamily: TitleFont,
                fontWeight: "400",
                color:
                  flight?.cabin_class === cabinClass.value
                    ? "#0086f3"
                    : "#c0ccdc",
              }}
              key={cabinClass?.value}
              ref={
                planeCabinClass === cabinClass.value
                  ? elementToScrollRef
                  : undefined
              }
            >
              {cabinClass.label}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  }
);
