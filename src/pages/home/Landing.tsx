import { LayoutImageBg } from "components/layout/LayoutImageBg";
import { FC, memo, useEffect, useState } from "react";

import LandingBg from "/assets/home/landing_bg.png";
import { Container, Grid, Typography } from "@mui/material";
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
      <LayoutImageBg
        bgImage={LandingBg}
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container
          sx={{
            margin: {
              sm: "15rem auto 5rem",
              xs: "10rem auto 5rem",
            },
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

          <Grid
            sx={{
              marginTop: {
                xs: "10rem",
                md: "15rem",
              },
              alignItems: "end",
              justifyContent: "space-between",
            }}
            container
            spacing={4}
          >
            <Grid item md={2.4} sm={6} xs={12}>
              <PlacesSearchAutocomplete
                sx={{
                  "& .MuiFormControl-root": {
                    padding: "2px 5px 2px 0",
                  },
                }}
                label="From"
                onChange={(newFrom) => setFrom(newFrom as MapboxPlaceType)}
                onInputChange={(newInputFrom) => setFromInput(newInputFrom)}
                value={from}
                inputValue={fromInput}
              />
            </Grid>

            <Grid item md={2.4} sm={6} xs={12}>
              <PlacesSearchAutocomplete
                sx={{
                  "& .MuiFormControl-root": {
                    padding: "2px 5px 2px 0",
                  },
                }}
                label="To"
                onChange={(newTo) => setTo(newTo as MapboxPlaceType)}
                onInputChange={(newInputTo) => setToInput(newInputTo)}
                value={to}
                inputValue={toInput}
              />
            </Grid>

            <Grid item md={2.4} sm={6} xs={12}>
              <CustomDateTimePicker
                sx={{}}
                label="Departure"
                onChange={(newDeparture) => setDeparture(newDeparture)}
                value={departure}
              />
            </Grid>
            <Grid item md={2.4} sm={6} xs={12}>
              <CustomDateTimePicker
                sx={{}}
                label="Arrival"
                onChange={(newArrival) => setArrival(newArrival)}
                value={arrival}
              />
            </Grid>
            <Grid
              sx={{
                textAlign: {
                  sm: "right",
                  xs: "center",
                },
              }}
              item
              md={2.4}
              xs={12}
            >
              <CustomButton
                onClick={handleSearch}
                title="Search"
                theme={ButtonTheme.Dark}
              />
            </Grid>
          </Grid>
        </Container>
      </LayoutImageBg>
    </>
  );
});
