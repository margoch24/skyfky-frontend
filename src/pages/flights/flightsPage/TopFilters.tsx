import { FC, memo, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { PlacesSearchAutocomplete } from "components/wrappers/PlacesSearchAutocomplete";
import { CustomDateTimePicker } from "components/wrappers/CustomDateTimePicker";
import { CustomNumberInput } from "components/wrappers/CustomNumberInput";
import { useQueryContext } from "common/hooks/queryContext";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme } from "shared/constants";
import { MapboxPlaceType } from "common/types";

export const TopFilters: FC = memo(() => {
  const { adultAmount, childAmount, setChildAmount, setAdultAmount } =
    useQueryContext();
  const { setQuery, query } = useQueryContext();
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
  };
  return (
    <Box>
      <Box
        sx={{
          maxHeight: {
            lg: "200px",
            xs: "auto",
          },
          width: "90%",
          maxWidth: "1536px",
          background: "rgba(33, 41, 64, 0.5)",
          bottom: 0,
          padding: "20px",
          zIndex: 9,
          margin: {
            lg: "0 auto",
            xs: "10rem auto 0",
          },

          "@media (max-width: 400px)": {
            padding: "5%",
          },
        }}
      >
        <Box
          sx={{
            display: {
              lg: "flex",
              xs: "block",
            },
          }}
        >
          <Box
            sx={{
              flex: "1 1 0",
              marginRight: {
                lg: "20px",
              },
              borderRight: {
                lg: "1px solid white",
              },
              paddingRight: {
                lg: "20px",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: TitleFont,
                color: "white",
                fontWeight: 600,
                fontSize: "24px",
              }}
            >
              Destination
            </Typography>

            <Box
              sx={{
                display: "flex",
                marginTop: {
                  lg: "2rem",
                },
                marginBottom: {
                  lg: 0,
                  xs: "2rem",
                },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  "& .MuiFormControl-root": {
                    padding: "2px 0",
                  },
                  flex: "1 1 0",
                  marginRight: "1rem",
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
                  "& .MuiFormControl-root": {
                    padding: "2px 0",
                  },
                  flex: "1 1 0",
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
            </Box>
          </Box>
          <Box
            sx={{
              flex: "1 1 0",
              marginRight: {
                lg: "20px",
              },
              borderRight: {
                lg: "1px solid white",
              },
              paddingRight: {
                lg: "20px",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: TitleFont,
                color: "white",
                fontWeight: 600,
                fontSize: "24px",
              }}
            >
              Date
            </Typography>

            <Box
              sx={{
                display: "flex",
                marginTop: {
                  lg: "2rem",
                },
                marginBottom: {
                  lg: 0,
                  xs: "2rem",
                },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  flex: "1 1 0",
                  marginRight: "1rem",
                }}
              >
                <CustomDateTimePicker
                  label="Departure"
                  onChange={(newDeparture) => setDeparture(newDeparture)}
                  value={departure}
                />
              </Box>

              <Box
                sx={{
                  flex: "1 1 0",
                }}
              >
                <CustomDateTimePicker
                  label="Arrival"
                  onChange={(newArrival) => setArrival(newArrival)}
                  value={arrival}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flex: "1 1 0",
            }}
          >
            <Typography
              sx={{
                fontFamily: TitleFont,
                color: "white",
                fontWeight: 600,
                fontSize: "24px",
              }}
            >
              Passengers
            </Typography>

            <Box
              sx={{
                display: "flex",
                marginTop: "0.7rem",
                justifyContent: "space-between",
                alignItems: "end",

                "@media (max-width: 500px)": {
                  display: "block",
                  textAlign: "center",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",

                  "@media (max-width: 310px)": {
                    display: "block",
                    margin: "0 auto",
                    width: "fit-content",
                  },
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: SubtitleFont,
                      fontSize: "16px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Adults
                  </Typography>
                  <CustomNumberInput
                    placeholder={String(adultAmount)}
                    value={adultAmount}
                    min={1}
                    onChange={(value) => setAdultAmount(value)}
                  />
                </Box>

                <Box
                  sx={{
                    "@media (max-width: 310px)": {
                      marginTop: "1rem",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: SubtitleFont,
                      fontSize: "16px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Children
                  </Typography>
                  <CustomNumberInput
                    placeholder={String(childAmount)}
                    value={childAmount}
                    onChange={(value) => setChildAmount(value)}
                  />
                </Box>
              </Box>

              <CustomButton
                sx={{
                  "@media (max-width: 500px)": {
                    marginTop: "2rem",
                  },
                }}
                onClick={handleSearch}
                title="Search"
                theme={ButtonTheme.Dark}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
