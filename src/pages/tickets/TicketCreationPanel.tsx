import { Box, Button } from "@mui/material";
import { Dispatch, FC, SetStateAction, memo, useEffect, useState } from "react";
import { SubtitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { TicketCreationPages } from "./constants";
import { PassengerInfoType } from "./types";
import { FlightType, SeatType } from "pages/flights/types";
import { Divider } from "components/wrappers/Divider";

export interface ElementProps {
  onNext?: () => void;
  onPrevious?: () => void;
  passengers: PassengerInfoType[];
  setPassengers: Dispatch<SetStateAction<PassengerInfoType[]>>;
  seats: SeatType[];
  availableSeats: SeatType[];
  flight: FlightType;
}

interface TicketCreationPanelProps {
  flight: FlightType;
}

export const TicketCreationPanel: FC<TicketCreationPanelProps> = memo(
  ({ flight }) => {
    const [passengers, setPassengers] = useState<PassengerInfoType[]>([]);

    const defaultPage = TicketCreationPages.find((page) => page?.default);
    const [currentPageKey, setCurrentPageKey] = useState<string | undefined>(
      defaultPage?.key
    );
    const [Element, setElement] = useState<FC<ElementProps> | undefined>(
      defaultPage?.element
    );

    useEffect(() => {
      const currentPage = TicketCreationPages.find(
        (page) => page?.key === currentPageKey
      );
      setElement(currentPage?.element);
    }, [currentPageKey]);

    useEffect(() => {
      setPassengers(passengers);
    }, [passengers]);

    const handleNext = () => {
      const currentPageIndex = TicketCreationPages.findIndex(
        (page) => page?.key === currentPageKey
      );
      if (currentPageIndex === -1) {
        return false;
      }

      if (currentPageIndex === TicketCreationPages.length - 1) {
        return false;
      }

      const nextPage = TicketCreationPages[currentPageIndex + 1];
      setCurrentPageKey(nextPage.key);
    };

    const handlePrevious = () => {
      const currentPageIndex = TicketCreationPages.findIndex(
        (page) => page?.key === currentPageKey
      );
      if (currentPageIndex === -1) {
        return false;
      }

      if (currentPageIndex <= 0) {
        return false;
      }

      const prevPage = TicketCreationPages[currentPageIndex - 1];
      setCurrentPageKey(prevPage.key);
    };

    return (
      <Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: DarkColor,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {TicketCreationPages.map(({ key, title }, index) => (
            <Button
              disableRipple={true}
              key={key}
              sx={{
                padding: "15px 40px",
                width: "fit-content",
                borderRadius: 0,
                cursor: "default",
                backgroundColor:
                  currentPageKey === key
                    ? "rgba(111, 130, 170, 0.6)"
                    : "transparent",

                fontFamily: SubtitleFont,
                fontSize: "20px",
                color: "white",
                textTransform: "none",
                position: "relative",
                "&:hover": {
                  backgroundColor:
                    currentPageKey === key
                      ? "rgba(111, 130, 170, 0.6)"
                      : "transparent",
                },
              }}
            >
              <span
                style={{
                  marginLeft: "1rem",
                }}
              >
                {title}
              </span>

              {index === 0 && (
                <Box>
                  <Box
                    sx={{
                      width: 0,
                      height: 0,
                      borderTop: "32px solid transparent",
                      borderBottom: "32px solid transparent",
                      borderLeft: `20px solid white`,
                      position: "absolute",
                      left: "2px",
                      zIndex: 2,
                      top: "0px",
                    }}
                  ></Box>
                  <Box
                    sx={{
                      content: '""',
                      width: 0,
                      height: 0,
                      borderTop: "32px solid transparent",
                      borderBottom: "32px solid transparent",
                      borderLeft: `20px solid ${DarkColor}`,
                      position: "absolute",
                      left: "0px",
                      zIndex: 3,
                      top: "0px",
                    }}
                  ></Box>
                </Box>
              )}
              <Box
                sx={{
                  width: 0,
                  height: 0,
                  borderTop: "32px solid transparent",
                  borderBottom: "32px solid transparent",
                  borderLeft: `20px solid white`,
                  position: "absolute",
                  right: "-22px",
                  zIndex: 2,
                }}
              ></Box>
              <Box
                sx={{
                  content: '""',
                  width: 0,
                  height: 0,
                  borderTop: "32px solid transparent",
                  borderBottom: "32px solid transparent",
                  borderLeft: `20px solid ${
                    currentPageKey === key ? "#505e80" : DarkColor
                  }`,
                  position: "absolute",
                  right: "-20px",
                  zIndex: 3,
                  transition: "border-color 250ms",
                }}
              ></Box>
            </Button>
          ))}
        </Box>

        <Box
          sx={{
            width: "100%",
            marginBottom: "5rem",
          }}
        >
          <Box
            sx={{
              width: "fit-content",
              margin: "auto",
            }}
          >
            {Element && (
              <Element
                passengers={passengers}
                setPassengers={setPassengers}
                onNext={handleNext}
                onPrevious={handlePrevious}
                seats={flight?.seats || []}
                availableSeats={flight?.available_seats as SeatType[]}
                flight={flight}
              />
            )}
          </Box>
        </Box>

        <Divider />
      </Box>
    );
  }
);
