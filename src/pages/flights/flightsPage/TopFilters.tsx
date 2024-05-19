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
    <Box
      sx={{
        maxHeight: "200px",
        width: "1536px",
        background: "rgba(33, 41, 64, 0.5)",
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "20px",
        zIndex: 9,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            flex: "1 1 0",
            marginRight: "20px",
            borderRight: "1px solid white",
            paddingRight: "20px",
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
              marginTop: "2rem",
              justifyContent: "space-between",
            }}
          >
            <PlacesSearchAutocomplete
              label="From"
              sx={{
                minWidth: "220px",

                "& .MuiFormControl-root": {
                  padding: "2px 0",
                },
              }}
              onChange={(newFrom) => setFrom(newFrom as MapboxPlaceType)}
              onInputChange={(newInputFrom) => setFromInput(newInputFrom)}
              value={from}
              inputValue={fromInput}
            />

            <PlacesSearchAutocomplete
              label="To"
              sx={{
                minWidth: "220px",

                "& .MuiFormControl-root": {
                  padding: "2px 0",
                },
              }}
              onChange={(newTo) => setTo(newTo as MapboxPlaceType)}
              onInputChange={(newInputTo) => setToInput(newInputTo)}
              value={to}
              inputValue={toInput}
            />
          </Box>
        </Box>
        <Box
          sx={{
            flex: "1 1 0",
            marginRight: "20px",
            borderRight: "1px solid white",
            paddingRight: "20px",
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
              marginTop: "2rem",
              justifyContent: "space-between",
            }}
          >
            <CustomDateTimePicker
              sx={{
                maxWidth: "220px",
              }}
              label="Departure"
              onChange={(newDeparture) => setDeparture(newDeparture)}
              value={departure}
            />

            <CustomDateTimePicker
              sx={{
                maxWidth: "220px",
              }}
              label="Arrival"
              onChange={(newArrival) => setArrival(newArrival)}
              value={arrival}
            />
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
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
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
                  //   max={Math.floor(minAmountOfPassengers / 2)}
                  min={1}
                  onChange={(value) => setAdultAmount(value)}
                  //   sx={{
                  //     color: ""
                  //   }}
                  //   onDecrease={() => removeLastPassenger(PassengerType.Adult)}
                />
              </Box>

              <Box>
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
                  //   max={Math.floor(minAmountOfPassengers / 2)}
                  onChange={(value) => setChildAmount(value)}
                  // onDecrease={() => removeLastPassenger(PassengerType.Child)}
                />
              </Box>
            </Box>

            <CustomButton
              onClick={handleSearch}
              title="Search"
              theme={ButtonTheme.Dark}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
