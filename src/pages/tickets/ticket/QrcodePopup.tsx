import { FC, memo, useEffect, useRef, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";

import { getImageHelper } from "common/helpers/getImage";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { CustomPopup } from "components/wrappers/CustomPopup";
import { TicketType } from "../types";
import { IoAirplaneSharp } from "react-icons/io5";
import { getFormattedTime } from "common/helpers";

interface QrcodePopupProps {
  open: boolean;
  handlePopupClose: () => void;
  qrcode: string;
  ticket: TicketType;
  isTickedValid: boolean;
}

export const QrcodePopup: FC<QrcodePopupProps> = memo(
  ({ open, handlePopupClose, qrcode, ticket, isTickedValid }) => {
    const timeDifference = (ticket?.flight?.arrival || 0) - +new Date();
    const [validityTime, setValidityTime] = useState(
      timeDifference < 0 ? 0 : timeDifference
    );
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setValidityTime((prevTime) =>
          prevTime - 1000 < 0 ? 0 : prevTime - 1000
        );
      }, 1000);

      return () => clearTimeout(timerRef.current);
    }, [validityTime]);

    return (
      <CustomPopup onClose={handlePopupClose} open={open}>
        <Box
          sx={{
            width: "400px",
            height: "600px",
            padding: "2rem",
            backgroundColor: DarkColor,
            textAlign: "center",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              fontFamily: TitleFont,
              fontSize: "25px",
              background: `linear-gradient(15deg, ${
                !isTickedValid
                  ? "#d0312d 30%, #990f02 90%"
                  : "#00ccff 30%, #d500f9 90%"
              })`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600,
              marginBottom: "2rem",
              textShadow: "3px 4px 3px rgba(0, 0, 0, 0.25)",
            }}
          >
            Ticket QR code
          </Typography>
          <Box
            sx={{
              textAlign: "center",
              position: "relative",
              height: "280px",
              width: "280px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "auto",
              overflow: "hidden",
              marginBottom: "5rem",

              "&::before": {
                content: '""',
                position: "absolute",
                width: "400px",
                height: "140%",
                background: `linear-gradient(${
                  !isTickedValid ? "#d0312d, #990f02" : "#00ccff, #d500f9"
                })`,
                ...(isTickedValid && {
                  animation: "rotate 1s linear infinite",
                }),
              },

              "@keyframes rotate": {
                from: {
                  transform: "rotate(0deg)",
                },
                to: {
                  transform: "rotate(360deg)",
                },
              },
            }}
          >
            <img
              height="250px"
              width="250px"
              style={{
                zIndex: 2,
                position: "inherit",
              }}
              src={getImageHelper(qrcode, true)}
            />
          </Box>

          <Divider
            sx={{
              opacity: "50%",
              border: "none",
              height: "1px",
              background: `repeating-linear-gradient(90deg,white,white 6px,transparent 6px,transparent 12px)`,
              position: "relative",
            }}
          />

          <Box
            sx={{
              marginTop: "3rem",
            }}
          >
            <Typography
              sx={{
                fontFamily: SubtitleFont,
                fontSize: "20px",
                color: "white",
              }}
            >
              {ticket.name} {ticket.surname}
            </Typography>

            {isTickedValid ? (
              <Typography
                sx={{
                  fontFamily: SubtitleFont,
                  fontSize: "20px",
                  color: "white",
                  marginTop: "15px",
                }}
              >
                Time left: {getFormattedTime(validityTime)}
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontFamily: SubtitleFont,
                  fontSize: "20px",
                  color: "#d0312d",
                  marginTop: "15px",
                }}
              >
                Expired
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: "15px",
              right: "20px",
              transform: "rotate(-45deg)",
            }}
          >
            <IoAirplaneSharp color="white" size={50} />
          </Box>
        </Box>
      </CustomPopup>
    );
  }
);
