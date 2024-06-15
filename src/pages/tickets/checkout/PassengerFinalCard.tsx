import { FC, memo } from "react";
import { Box, Typography } from "@mui/material";
import { SubtitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { PassengerInfoType } from "../types";
import { FlightType } from "pages/flights/types";
import { capitalizeFirstLetter } from "common/helpers";
import { DatesComponent } from "./DatesComponent";
import { ChekoutPlacesComponent } from "./ChekoutPlacesComponent";
import { IoAirplaneSharp } from "react-icons/io5";
import { DiscountType } from "common/types";

interface PassengerFinalCardProps {
  passenger: PassengerInfoType;
  flight: FlightType;
  index: number;
  adultsPrice: number;
  childrenPrice: number;
  currency: string;
  childDiscount?: DiscountType;
}

export const PassengerFinalCard: FC<PassengerFinalCardProps> = memo(
  ({
    passenger,
    flight,
    index,
    adultsPrice,
    childrenPrice,
    currency,
    childDiscount,
  }) => {
    const isPassengerChild = !!passenger?.parent;

    return (
      <Box
        sx={{
          padding: "20px",
          background: `rgba(111, 130, 170, 0.3)`,
          ...(index !== 0 && { marginTop: "3rem" }),
          borderRadius: "10px",
          maxWidth: "650px",
          position: "relative",
          margin: "2rem auto 0",
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
              color: DarkColor,
              flex: "1 1 0",
              wordBreak: "break-all",
              paddingRight: "10px",
            }}
          >
            {passenger?.name} {passenger?.surname}
          </Typography>

          <Box
            sx={{
              padding: "0 10px",
              border: `1px solid ${DarkColor}`,
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                fontFamily: SubtitleFont,
                color: DarkColor,
              }}
            >
              {passenger?.parent ? "Child" : "Adult"}
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "22px",
            fontFamily: SubtitleFont,
            color: DarkColor,
            marginTop: "15px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              opacity: "60%",
            }}
          >
            Date of birth:
          </span>{" "}
          {passenger.dateOfBirth.toLocaleString("lt").split(" ")[0]}
        </Typography>
        {isPassengerChild && (
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
              Parent:
            </span>{" "}
            {passenger?.parent}
          </Typography>
        )}

        <ChekoutPlacesComponent flight={flight} />
        <DatesComponent flight={flight} />

        <Typography
          sx={{
            fontSize: "22px",
            fontFamily: SubtitleFont,
            color: DarkColor,
            marginTop: "15px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              opacity: "60%",
            }}
          >
            Seat:
          </span>{" "}
          {passenger?.seat
            ? `${passenger?.seat?.row}${passenger?.seat?.column}`
            : "..."}
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
            Class:
          </span>{" "}
          {capitalizeFirstLetter(flight.cabin_class)}
        </Typography>

        <Typography
          sx={{
            fontSize: "22px",
            fontFamily: SubtitleFont,
            color: DarkColor,
            marginTop: "15px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              opacity: "60%",
            }}
          >
            Price:
          </span>{" "}
          {isPassengerChild ? childrenPrice : adultsPrice} {currency}
        </Typography>

        {isPassengerChild && (
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
              Discount:
            </span>{" "}
            {(Number(childDiscount?.value) || 0) * 100} %
          </Typography>
        )}

        <Box
          sx={{
            position: "absolute",
            bottom: "15px",
            right: "20px",
            transform: "rotate(-45deg)",
          }}
        >
          <IoAirplaneSharp color={DarkColor} size={50} />
        </Box>
      </Box>
    );
  }
);
