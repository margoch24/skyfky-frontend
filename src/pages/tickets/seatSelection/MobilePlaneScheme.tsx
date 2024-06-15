import { Dispatch, FC, SetStateAction, memo, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { TOTAL_SEATS_AMOUNT } from "shared/constants";
import { FlightType, SeatColumns, SeatType } from "pages/flights/types";
import TopPlaneMobile from "/assets/flights/top_plane_mobile.png";
import { DarkColor } from "shared/constants/colors";
import { CABIN_CLASSES } from "pages/flights/constants";
import { PassengerInfoType } from "../types";
import { TitleFont } from "shared/constants/fonts";

interface MobilePlaneSchemeProps {
  passengerForSeat?: PassengerInfoType;
  passengers: PassengerInfoType[];
  setPassengers: Dispatch<SetStateAction<PassengerInfoType[]>>;
  seats: SeatType[];
  flight: FlightType;
  availableSeats: SeatType[];
  planeCabinClass: string;
  onSeatChanged?: (passengerIndex: number) => void;
}

export const MobilePlaneScheme: FC<MobilePlaneSchemeProps> = memo(
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
    const ButtonHeight = 45;
    const containerRef = useRef<HTMLDivElement>(null);
    const elementToScrollRef = useRef<HTMLDivElement>(null);

    const maxRowsCabinClass = CABIN_CLASSES.reduce((max, record) => {
      return record.rows > max.rows ? record : max;
    }, CABIN_CLASSES[0]);

    useEffect(() => {
      const container = containerRef.current;
      if (!elementToScrollRef.current) {
        return;
      }
      const selectedOffsetTop = elementToScrollRef.current.offsetTop;

      const scrollPosition =
        selectedOffsetTop <= 16 ? 0 : selectedOffsetTop + 235;

      container?.scrollTo({
        top: scrollPosition,
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
          height: `${maxRowsCabinClass.rows * (ButtonHeight + 16)}px`,
          display: {
            md: "none",
            xs: "block",
          },
          overflow: "hidden",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box>
          <Box
            sx={{
              margin: "auto",
              height: "250px",
              maxWidth: "300px",
              filter:
                "drop-shadow(0px 3px 0 #e4ecf8) drop-shadow(-3px 0 0 #e4ecf8) drop-shadow(0 -3px 0 #e4ecf8) drop-shadow(3px 0px 0px #e4ecf8)",
            }}
          >
            <img height="100%" width="100%" src={TopPlaneMobile} />
          </Box>
          <Box
            sx={{
              backgroundColor: "#f5f7fd",
              position: "relative",
              borderLeft: "4px solid #e4ecf8",
              borderBottom: "4px solid #e4ecf8",
              borderRight: "4px solid #e4ecf8",
              maxWidth: "300px",
              margin: "auto",
              paddingBottom: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                justifyContent: "space-between",
                flexDirection: "column",
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

                const cabinClassFirstRow = CABIN_CLASSES.find(
                  ({ firstRowIndex }) => firstRowIndex === index
                );

                return (
                  <Box
                    sx={{
                      width: "100%",
                    }}
                    key={index}
                  >
                    {cabinClassFirstRow && (
                      <Typography
                        sx={{
                          marginTop: "1rem",
                          textAlign: "center",
                          fontSize: "20px",
                          fontFamily: TitleFont,
                          fontWeight: "400",
                          color:
                            flight?.cabin_class === cabinClassFirstRow.value
                              ? "#0086f3"
                              : "#c0ccdc",
                        }}
                        ref={
                          planeCabinClass === cabinClassFirstRow.value
                            ? elementToScrollRef
                            : undefined
                        }
                      >
                        {cabinClassFirstRow.label}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        width: "100%",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <Box>
                        <Button
                          disabled={buttonDisabled(ASeat)}
                          sx={{
                            height: `${ButtonHeight}px`,
                            minWidth: "43px",
                            backgroundColor: seatButtonBackground(ASeat),
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
                            height: `${ButtonHeight}px`,
                            minWidth: "43px",
                            backgroundColor: seatButtonBackground(BSeat),

                            marginLeft: "10px",

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
                            height: `${ButtonHeight}px`,
                            minWidth: "43px",
                            backgroundColor: seatButtonBackground(CSeat),

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
                            height: `${ButtonHeight}px`,
                            minWidth: "43px",
                            backgroundColor: seatButtonBackground(DSeat),
                            marginLeft: "10px",

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
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* <Box
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
        </Box> */}
      </Box>
    );
  }
);
