import { FC, memo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { TicketType } from "../types";
import FlightCardImg from "/assets/flights/flight_card_img.jpg";
import ValidIcon from "/assets/valid.png";
import InvalidIcon from "/assets/invalid.png";

import { getImageHelper } from "common/helpers/getImage";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, CurrencyEnum, CurrencyToSign } from "shared/constants";
import { TicketCardPlaces } from "./TicketCardPlaces";
import { TicketCardDates } from "./TicketCardDates";
import { capitalizeFirstLetter } from "common/helpers";
import { CabinClassColors } from "pages/flights/constants";
import { QrcodePopup } from "./QrcodePopup";

interface TicketCardProps {
  ticket: TicketType;
  lastTicketRef?: (node?: Element | null) => void;
}

export const TicketCard: FC<TicketCardProps> = memo(
  ({ ticket, lastTicketRef }) => {
    const currency = CurrencyToSign[ticket?.currency || CurrencyEnum.EUR];
    const cabinClassColor = CabinClassColors[ticket?.flight?.cabin_class];
    const [open, setOpen] = useState(false);
    const isTicketValid = (ticket?.flight?.arrival || 0) > +new Date();

    const handlePopupOpen = () => {
      setOpen(true);
    };

    const handlePopupClose = () => {
      setOpen(false);
    };

    return (
      <Box
        ref={lastTicketRef}
        sx={{
          minHeight: "400px",
          boxShadow: "4px 3px 10px rgba(0, 0, 0, 0.25)",
          minWidth: {
            lg: "740px",
          },
          maxWidth: {
            md: "inherit",
            xs: "350px",
          },
          margin: {
            md: "4rem auto auto",
            xs: "4rem auto",
          },
        }}
      >
        <Box
          sx={{
            display: {
              md: "flex",
            },
          }}
        >
          <Box
            sx={{
              height: "200px",
              minWidth: {
                md: "330px",
              },
            }}
          >
            <img
              height="100%"
              width="100%"
              src={
                ticket?.flight?.photo
                  ? getImageHelper(ticket?.flight?.photo)
                  : FlightCardImg
              }
            />
          </Box>

          <Box
            sx={{
              margin: "15px 20px",
              display: "flex",
              justifyContent: "space-between",
              width: {
                md: "100%",
              },

              "@media (max-width: 345px)": {
                flexDirection: "column-reverse",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: SubtitleFont,
                    color: DarkColor,
                    opacity: "30%",
                    fontSize: "16px",
                  }}
                >
                  Name
                </Typography>
                <Typography
                  sx={{
                    fontFamily: TitleFont,
                    fontSize: "22px",
                    color: DarkColor,
                  }}
                >
                  {ticket?.name}
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
                  Surname
                </Typography>
                <Typography
                  sx={{
                    fontFamily: TitleFont,
                    fontSize: "22px",
                    color: DarkColor,
                  }}
                >
                  {ticket?.surname}
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
                  Date of birth
                </Typography>
                <Typography
                  sx={{
                    fontFamily: TitleFont,
                    fontSize: "22px",
                    color: DarkColor,
                  }}
                >
                  {
                    new Date(ticket?.date_of_birth)
                      .toLocaleString("lt")
                      .split(" ")[0]
                  }
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {isTicketValid ? (
                <Typography
                  sx={{
                    fontFamily: TitleFont,
                    fontSize: "22px",
                    color: DarkColor,
                    display: "flex",
                    height: "fit-content",
                    alignItems: "end",
                  }}
                >
                  Valid{" "}
                  <img
                    style={{ marginLeft: "10px" }}
                    height="40px"
                    width="40px"
                    src={ValidIcon}
                  />
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontFamily: TitleFont,
                    fontSize: "22px",
                    color: DarkColor,
                    display: "flex",
                    height: "fit-content",
                    alignItems: "end",
                  }}
                >
                  Expired{" "}
                  <img
                    style={{ marginLeft: "10px" }}
                    height="40px"
                    width="40px"
                    src={InvalidIcon}
                  />
                </Typography>
              )}

              <Box>
                <Typography
                  sx={{
                    fontFamily: SubtitleFont,
                    color: DarkColor,
                    opacity: "30%",
                    fontSize: "16px",
                  }}
                >
                  Type
                </Typography>
                <Typography
                  sx={{
                    fontFamily: TitleFont,
                    fontSize: "22px",
                    color: DarkColor,
                  }}
                >
                  {capitalizeFirstLetter(ticket?.type)}
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
                  Class
                </Typography>
                <Box
                  sx={{
                    border: `1px solid ${cabinClassColor}`,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: SubtitleFont,
                      fontSize: "18px",
                      color: cabinClassColor,
                    }}
                  >
                    {capitalizeFirstLetter(ticket?.flight?.cabin_class)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            padding: "0 20px",
            display: {
              md: "flex",
            },
            justifyContent: "space-between",
          }}
        >
          <TicketCardPlaces
            sx={{
              marginRight: "3rem",
            }}
            flight={ticket?.flight}
          />
          <TicketCardDates flight={ticket?.flight} />
        </Box>

        <Box
          sx={{
            display: {
              md: "flex",
            },
            justifyContent: "space-between",
            padding: "20px",
            alignItems: "end",
            textAlign: {
              md: "left",
              xs: "center",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              textAlign: "left",

              "@media (max-width: 430px)": {
                display: "block",
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: SubtitleFont,
                  color: DarkColor,
                  opacity: "30%",
                  fontSize: "16px",
                }}
              >
                Total price:
              </Typography>
              <Typography
                sx={{
                  fontFamily: TitleFont,
                  fontSize: "22px",
                  color: DarkColor,
                  marginTop: "3px",
                  width: "max-content",
                }}
              >
                {ticket?.price} {currency}
              </Typography>
            </Box>

            <Box
              sx={{
                marginLeft: "3rem",

                "@media (max-width: 430px)": {
                  marginLeft: 0,
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: SubtitleFont,
                  color: DarkColor,
                  opacity: "30%",
                  fontSize: "16px",
                }}
              >
                Airline
              </Typography>
              <Typography
                sx={{
                  fontFamily: TitleFont,
                  fontSize: "22px",
                  color: DarkColor,
                  marginTop: "3px",
                }}
              >
                {ticket?.flight?.airline}
              </Typography>
            </Box>
            <Box
              sx={{
                marginLeft: "3rem",

                "@media (max-width: 430px)": {
                  marginLeft: 0,
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: SubtitleFont,
                  color: DarkColor,
                  opacity: "30%",
                  fontSize: "16px",
                }}
              >
                Seat
              </Typography>
              <Typography
                sx={{
                  fontFamily: TitleFont,
                  fontSize: "22px",
                  color: DarkColor,
                  marginTop: "3px",
                }}
              >
                {ticket?.seat?.row}
                {ticket?.seat?.column}
              </Typography>
            </Box>
          </Box>

          <CustomButton
            sx={{
              marginTop: {
                md: 0,
                xs: "1rem",
              },
            }}
            onClick={handlePopupOpen}
            theme={ButtonTheme.Dark}
            title="Show ticket"
          />
        </Box>

        <QrcodePopup
          handlePopupClose={handlePopupClose}
          open={open}
          qrcode={ticket.qrcode}
          ticket={ticket}
          isTickedValid={isTicketValid}
        />
      </Box>
    );
  }
);
