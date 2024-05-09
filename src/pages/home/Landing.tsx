import { LayoutImageBg } from "components/layout/LayoutImageBg";
import { FC, memo, useState } from "react";

import LandingBg from "/assets/home/landing_bg.png";
import { Box, Container, Typography } from "@mui/material";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme } from "shared/constants";
import { PlacesSearchAutocomplete } from "components/wrappers/PlacesSearchAutocomplete";
import { CustomDatePicker } from "components/wrappers/CustomDatePicker";
import { MapboxPlaceType } from "common/types";

export const Landing: FC = memo(() => {
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [from, setFrom] = useState<MapboxPlaceType | null>(null);
  const [to, setTo] = useState<MapboxPlaceType | null>(null);
  const [departure, setDeparture] = useState<Date | null>(null);
  const [arrival, setArrival] = useState<Date | null>(null);
  return (
    <>
      <LayoutImageBg bgImage={LandingBg} height="100vh">
        <Container
          sx={{
            marginTop: "10rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "#ffff",
              fontFamily: TitleFont,
              fontSize: "60px",
              textShadow: "3px 4px 3px rgba(0, 0, 0, 0.25)",
            }}
          >
            Where <b>Booking Flights</b> <br /> is a <b>Breeze</b>
          </Typography>

          <Typography
            sx={{
              fontSize: "25px",
              fontFamily: SubtitleFont,
              color: "#ffff",
              textShadow: "0px 2px 3px rgba(0, 0, 0, 0.25)",
            }}
          >
            Say goodbye to long queues and tedious booking processes.
          </Typography>

          <Box
            sx={{
              marginTop: "15rem",
              display: "flex",
              alignItems: "center",
              gap: "50px",
            }}
          >
            <Box
              sx={{
                flex: "1 1 0",
                minWidth: "210px",
              }}
            >
              <PlacesSearchAutocomplete
                label="From"
                onChange={(newFrom) => setFrom(newFrom as MapboxPlaceType)}
                onInputChange={(newInputFrom) => setFromInput(newInputFrom)}
                value={from}
                inputValue={fromInput}
              />
            </Box>

            <Box
              sx={{
                flex: "1 1 0",
                minWidth: "210px",
              }}
            >
              <PlacesSearchAutocomplete
                label="To"
                onChange={(newTo) => setTo(newTo as MapboxPlaceType)}
                onInputChange={(newInputTo) => setToInput(newInputTo)}
                value={to}
                inputValue={toInput}
              />
            </Box>

            <CustomDatePicker
              sx={{
                flex: "1 1 0",
              }}
              label="Departure"
              onChange={(newDeparture) => setDeparture(newDeparture)}
              value={departure}
            />
            <CustomDatePicker
              sx={{
                flex: "1 1 0",
              }}
              label="Arrival"
              onChange={(newArrival) => setArrival(newArrival)}
              value={arrival}
            />
            <CustomButton title="Search" theme={ButtonTheme.Dark} />
          </Box>
        </Container>
      </LayoutImageBg>
    </>
  );
});
