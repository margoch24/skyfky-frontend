import { LayoutImageBg } from "components/layout/LayoutImageBg";
import { FC, memo, useEffect, useState } from "react";

import LandingBg from "/assets/home/landing_bg.png";
import { Box, Container, Typography } from "@mui/material";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, PagePath } from "shared/constants";
import { PlacesSearchAutocomplete } from "components/wrappers/PlacesSearchAutocomplete";
import { CustomDateTimePicker } from "components/wrappers/CustomDateTimePicker";
import { MapboxPlaceType } from "common/types";
import { useQueryContext } from "common/hooks/queryContext";
import { useNavigate } from "react-router-dom";

export const Landing: FC = memo(() => {
  const { setQuery, query } = useQueryContext();
  const navigate = useNavigate();
  const {
    from: queryFrom,
    to: queryTo,
    departureFullDate,
    arrivalFullDate,
  } = query ?? {};

  const [fromInput, setFromInput] = useState(
    queryFrom?.text ? queryFrom?.text : ""
  );
  const [toInput, setToInput] = useState(queryTo?.text ? queryTo?.text : "");
  const [from, setFrom] = useState<MapboxPlaceType | null>(
    queryFrom ? queryFrom : null
  );
  const [to, setTo] = useState<MapboxPlaceType | null>(
    queryTo ? queryTo : null
  );
  const [departure, setDeparture] = useState<Date | null>(
    departureFullDate ? new Date(departureFullDate) : null
  );
  const [arrival, setArrival] = useState<Date | null>(
    arrivalFullDate ? new Date(arrivalFullDate) : null
  );

  useEffect(() => {
    const {
      from: newQueryFrom,
      to: newQueryTo,
      departureFullDate: newDepartureFullDate,
      arrivalFullDate: newArrivalFullDate,
    } = query ?? {};

    setDeparture(newDepartureFullDate ? new Date(newDepartureFullDate) : null);
    setArrival(newArrivalFullDate ? new Date(newArrivalFullDate) : null);

    setFromInput(newQueryFrom?.text ? newQueryFrom?.text : "");
    setToInput(newQueryTo?.text ? newQueryTo?.text : "");
    setFrom(newQueryFrom ? newQueryFrom : null);
    setTo(newQueryTo ? newQueryTo : null);
  }, [query]);

  const handleSearch = () => {
    const [from_longitude, from_latitude] = from?.geometry?.coordinates ?? [];
    const [to_longitude, to_latitude] = to?.geometry?.coordinates ?? [];

    const params = {
      ...(fromInput
        ? {
            from_longitude,
            from_latitude,
            from,
          }
        : {
            from_longitude: undefined,
            from_latitude: undefined,
            from: null,
          }),
      ...(toInput
        ? {
            to_longitude,
            to_latitude,
            to,
          }
        : {
            to_longitude: undefined,
            to_latitude: undefined,
            to: null,
          }),

      departure: departure?.getTime(),
      arrival: arrival?.getTime(),
      departureFullDate: departure,
      arrivalFullDate: arrival,
    };

    setQuery((prevQuery) => ({ ...prevQuery, ...params }));
    navigate(PagePath.Flights);
  };

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

            <CustomDateTimePicker
              sx={{
                flex: "1 1 0",
              }}
              label="Departure"
              onChange={(newDeparture) => setDeparture(newDeparture)}
              value={departure}
            />
            <CustomDateTimePicker
              sx={{
                flex: "1 1 0",
              }}
              label="Arrival"
              onChange={(newArrival) => setArrival(newArrival)}
              value={arrival}
            />
            <CustomButton
              onClick={handleSearch}
              title="Search"
              theme={ButtonTheme.Dark}
            />
          </Box>
        </Container>
      </LayoutImageBg>
    </>
  );
});
