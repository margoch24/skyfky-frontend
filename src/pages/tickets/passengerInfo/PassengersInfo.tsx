import { FC, memo, useEffect, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useQueryContext } from "common/hooks/queryContext";
import { SubtitleFont } from "shared/constants/fonts";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme } from "shared/constants";
import { CustomNumberInput } from "components/wrappers/CustomNumberInput";
import { DarkColor } from "shared/constants/colors";
import { PassengerInfoCard } from "./PassengerInfoCard";
import { PassengerInfoType, PassengerType } from "../types";
import { ElementProps } from "../TicketCreationPanel";
import { SeatType } from "pages/flights/types";
import { sortAscPassengers } from "common/helpers/passengers";

export const PassengersInfo: FC<ElementProps> = memo(
  ({ onNext, passengers, setPassengers, flight }) => {
    const isPageLoaded = useRef(false);

    useEffect(() => {
      if (!isPageLoaded.current) {
        window.scrollTo(0, 0);
      }

      isPageLoaded.current = true;
    });

    const handleNext = () => {
      onNext?.();
    };

    const minAmountOfPassengers = (
      (flight?.available_seats as SeatType[]) || []
    )?.length;

    const {
      childAmount = 0,
      adultAmount = 1,
      setAdultAmount,
      setChildAmount,
    } = useQueryContext();

    let index = 0;

    const addPassenger = ({
      data,
      cardId,
    }: {
      data: PassengerInfoType | null;
      cardId: string;
    }) => {
      const foundPassenger = passengers.find(
        (passenger) => passenger.cardId === cardId
      );

      if (!foundPassenger && data) {
        return setPassengers((prevPassengers) => [...prevPassengers, data]);
      }

      if (foundPassenger && !data) {
        const newPassengers = passengers.filter(
          (passengers) => passengers?.cardId !== cardId
        );

        return setPassengers([...newPassengers]);
      }

      if (foundPassenger && data) {
        const newPassengers = passengers.filter(
          (passengers) => passengers?.cardId !== cardId
        );

        return setPassengers([...newPassengers, data]);
      }
    };

    const removeLastPassenger = (lastPassengerType: string) => {
      const filteredAdultPassengers = passengers.filter(({ cardId }) =>
        cardId.includes(PassengerType.Adult)
      );
      const filteredChildPassengers = passengers.filter(({ cardId }) =>
        cardId.includes(PassengerType.Child)
      );

      const sortedAdultPassengers =
        filteredAdultPassengers.sort(sortAscPassengers);
      const sortedChildPassengers =
        filteredChildPassengers.sort(sortAscPassengers);

      if (lastPassengerType === PassengerType.Adult) {
        sortedAdultPassengers.pop();
      }

      if (lastPassengerType === PassengerType.Child) {
        sortedChildPassengers.pop();
      }

      setPassengers(() => {
        return [...sortedAdultPassengers, ...sortedChildPassengers];
      });
    };

    return (
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: {
              md: "absolute",
            },
            top: 0,
            right: "20px",

            "@media (max-width: 900px)": {
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              maxWidth: "450px",
              margin: "1rem auto 0",
            },

            "@media (max-width: 310px)": {
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: SubtitleFont,
                fontSize: "16px",
                color: DarkColor,
                opacity: "50%",
                marginBottom: "5px",
                textAlign: "center",
              }}
            >
              Adults
            </Typography>
            <CustomNumberInput
              placeholder={String(adultAmount)}
              value={adultAmount}
              max={minAmountOfPassengers - childAmount}
              min={1}
              onChange={(value) => setAdultAmount(value)}
              onDecrease={() => removeLastPassenger(PassengerType.Adult)}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontFamily: SubtitleFont,
                fontSize: "16px",
                color: DarkColor,
                opacity: "50%",
                marginTop: "2rem",
                marginBottom: "5px",
                textAlign: "center",
              }}
            >
              Children
            </Typography>
            <CustomNumberInput
              placeholder={String(childAmount)}
              value={childAmount}
              max={minAmountOfPassengers - adultAmount}
              onChange={(value) => setChildAmount(value)}
              onDecrease={() => removeLastPassenger(PassengerType.Child)}
            />
          </Box>
        </Box>

        <Box>
          {[...Array(adultAmount)].map((_, itemIndex) => {
            index += 1;
            const cardId = `${PassengerType.Adult}_${itemIndex}`;

            return (
              <PassengerInfoCard
                key={cardId}
                allPassengers={childAmount + adultAmount}
                index={index}
                type={PassengerType.Adult}
                onFinish={(passenger) => addPassenger(passenger)}
                cardId={cardId}
                passengers={passengers}
              />
            );
          })}

          {[...Array(childAmount)].map((_, itemIndex) => {
            index += 1;
            const cardId = `${PassengerType.Child}_${itemIndex}`;

            return (
              <PassengerInfoCard
                key={cardId}
                allPassengers={childAmount + adultAmount}
                index={index}
                type={PassengerType.Child}
                onFinish={(passenger) => addPassenger(passenger)}
                cardId={cardId}
                passengers={passengers}
              />
            );
          })}

          <Box
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <CustomButton
              disabled={passengers.length < childAmount + adultAmount}
              onClick={handleNext}
              title="Next"
              theme={ButtonTheme.Dark}
              sx={{
                padding: "0 55px",
              }}
            />
          </Box>
        </Box>
      </Container>
    );
  }
);
