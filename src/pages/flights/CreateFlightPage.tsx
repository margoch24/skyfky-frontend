import { FC, memo, useCallback, useState } from "react";
import { Layout } from "components/layout/Layout";
import { LayoutImageBg } from "components/layout/LayoutImageBg";
import { Box, Container, IconButton, Typography } from "@mui/material";
import CreateFlightBg from "/assets/flights/create_flight_bg.png";
import { CustomInput } from "components/wrappers/CustomInput";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, CURRENCIES } from "shared/constants";
import { CustomSelect } from "components/wrappers/CustomSelect";
import { CABIN_CLASSES, SCHEDULED } from "./constants";
import { CustomDatePicker } from "components/wrappers/CustomDatePicker";
import { PlacesSearchAutocomplete } from "components/wrappers/PlacesSearchAutocomplete";
import { CustomPopup } from "components/wrappers/CustomPopup";
import { UploadPhotoZone } from "components/wrappers/UploadPhotoZone";
import { DarkColor } from "shared/constants/colors";
import { TitleFont } from "shared/constants/fonts";
import { MdDeleteForever } from "react-icons/md";
import { MapboxPlaceType, ResponseData } from "common/types";
import {
  ValidationErrorMessages,
  validateIsEmpty,
} from "common/utils/validations";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";
import { showToastError, showToastSuccess } from "common/utils/toast";
import { FlightType } from "./types";
import { postFlight } from "api/requests/flights/postFlight";
import { useUserContext } from "common/hooks/userContext";

export const CreateFlightPage: FC = memo(() => {
  const [open, setOpen] = useState(false);
  const { accessToken } = useUserContext();
  const defaultCurrency = CURRENCIES.find(
    (currency) => currency?.default
  )?.value;

  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");

  const [newFilename, setFilename] = useState<string | null>(null);
  const [from, setFrom] = useState<MapboxPlaceType | null>(null);
  const [to, setTo] = useState<MapboxPlaceType | null>(null);
  const [departure, setDeparture] = useState<Date | null>(null);
  const [arrival, setArrival] = useState<Date | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string | undefined>(defaultCurrency);
  const [cabinClass, setCabinClass] = useState<string>("");
  const [scheduled, setScheduled] = useState<string>("");
  const [airline, setAirline] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);

  const [fromError, setFromError] = useState<string>("");
  const [toError, setToError] = useState<string>("");
  const [departureError, setDepartureError] = useState<string>("");
  const [arrivalError, setArrivalError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [cabinClassError, setCabinClassError] = useState<string>("");
  const [scheduledError, setScheduledError] = useState<string>("");
  const [airlineError, setAirlineError] = useState<string>("");
  const [scoreError, setScoreError] = useState<string>("");
  const [filenameError, setFilenameError] = useState<string>("");

  const handlePopupOpen = () => {
    setOpen(true);
  };

  const handlePopupClose = () => {
    setOpen(false);
  };

  const handleUpload = (filename: string) => {
    handlePopupClose();
    setFilename(filename);
  };

  const handleRemovePhoto = () => {
    setFilename(null);
  };

  const validateFrom = () => {
    if (!from) {
      setFromError(ValidationErrorMessages.FieldRequired);
    }
    return !!from;
  };

  const validateTo = () => {
    if (!to) {
      setToError(ValidationErrorMessages.FieldRequired);
    }
    return !!to;
  };

  const validateDeparture = () => {
    if (!departure) {
      setDepartureError(ValidationErrorMessages.FieldRequired);
    }
    return !!departure;
  };

  const validateArrival = () => {
    if (!arrival) {
      setArrivalError(ValidationErrorMessages.FieldRequired);
    }
    return !!arrival;
  };

  const validatePrice = () => {
    if (!price) {
      setPriceError(ValidationErrorMessages.FieldRequired);
    }
    return !!price;
  };

  const validateCabinClass = () => {
    const isValid = validateIsEmpty(cabinClass);
    if (!isValid) {
      setCabinClassError(ValidationErrorMessages.FieldRequired);
    }
    return isValid;
  };

  const validateScheduled = () => {
    const isValid = validateIsEmpty(scheduled);
    if (!isValid) {
      setScheduledError(ValidationErrorMessages.FieldRequired);
    }
    return isValid;
  };

  const validateAirline = () => {
    const isValid = validateIsEmpty(airline);
    if (!isValid) {
      setAirlineError(ValidationErrorMessages.FieldRequired);
    }
    return isValid;
  };

  const validateScore = () => {
    if (!score) {
      setScoreError(ValidationErrorMessages.FieldRequired);
    }
    return !!score;
  };

  const validateFilename = () => {
    if (!newFilename) {
      setFilenameError(ValidationErrorMessages.FieldRequired);
    }
    return !!newFilename;
  };

  const validateAll = (): boolean => {
    const fromValid = validateFrom();
    const toValid = validateTo();
    const departureValid = validateDeparture();
    const arrivalValid = validateArrival();
    const priceValid = validatePrice();
    const cabinClassValid = validateCabinClass();
    const scheduledValid = validateScheduled();
    const airlineValid = validateAirline();
    const scoreValid = validateScore();
    const filenameValid = validateFilename();

    return (
      fromValid &&
      toValid &&
      departureValid &&
      arrivalValid &&
      priceValid &&
      cabinClassValid &&
      scheduledValid &&
      airlineValid &&
      scoreValid &&
      filenameValid
    );
  };

  const fetchFunc = useCallback(async () => {
    const [from_longitude, from_latitude] = from?.geometry?.coordinates ?? [];
    const [to_longitude, to_latitude] = to?.geometry?.coordinates ?? [];

    const params = {
      airline,
      cabin_class: cabinClass,
      departure: departure?.getTime(),
      arrival: arrival?.getTime(),
      from_latitude,
      from_longitude,
      to_latitude,
      to_longitude,
      score,
      scheduled,
      price,
      currency,
      photo: newFilename,
    };
    return await postFlight(params, accessToken);
  }, [
    airline,
    cabinClass,
    departure,
    arrival,
    from,
    to,
    score,
    scheduled,
    price,
    currency,
    accessToken,
    newFilename,
  ]);

  const { mutate } = useMutation<AxiosResponse<ResponseData<FlightType>>>({
    mutationFn: () => debounce(fetchFunc(), 500),
    onSuccess: (axiosResponse) => {
      if (!axiosResponse) {
        showToastError("Internal server error");
      }

      const { error, data } = axiosResponse?.data ?? {};

      if (error) {
        showToastError(data?.message || "Internal server error");
      }

      if (!data.id) {
        return;
      }

      showToastSuccess("Flight created successfully");
      setDeparture(null);
      setArrival(null);
      setPrice(null);
      setCabinClass("");
      setAirline("");
      setScore(null);
      setCurrency(defaultCurrency);
      setFilename(null);
      setScheduled("");
      setFromInput("");
      setToInput("");
      setTo(null);
      setFrom(null);
    },
    onError: (err: Error) => {
      console.log(err);
      showToastError("Internal server error");
    },
  });

  const handleSubmit = () => {
    if (!validateAll()) return;

    mutate();
  };

  return (
    <>
      <Layout>
        <LayoutImageBg bgImage={CreateFlightBg} height="100vh" minHeight={true}>
          <Container
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "50%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                paddingTop: "5rem",
              }}
            >
              <PlacesSearchAutocomplete
                label="From*"
                onFocus={() => {
                  setFromError("");
                }}
                onBlur={validateFrom}
                onChange={(newFrom) => setFrom(newFrom as MapboxPlaceType)}
                onInputChange={(newInputFrom) => setFromInput(newInputFrom)}
                error={fromError}
                value={from}
                inputValue={fromInput}
              />

              <PlacesSearchAutocomplete
                sx={{ marginTop: "30px" }}
                label="To*"
                onFocus={() => {
                  setToError("");
                }}
                onBlur={validateTo}
                onChange={(newTo) => setTo(newTo as MapboxPlaceType)}
                onInputChange={(newInputTo) => setToInput(newInputTo)}
                error={toError}
                value={to}
                inputValue={toInput}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <Box sx={{ flex: "1 1 0" }}>
                  <CustomDatePicker
                    label="Departure*"
                    onFocus={() => {
                      setDepartureError("");
                    }}
                    onBlur={validateDeparture}
                    onChange={(newDeparture) => setDeparture(newDeparture)}
                    error={departureError}
                    value={departure}
                  />
                </Box>
                <Box sx={{ flex: "1 1 0", marginLeft: "25px" }}>
                  <CustomDatePicker
                    label="Arrival*"
                    onFocus={() => {
                      setArrivalError("");
                    }}
                    onBlur={validateArrival}
                    onChange={(newArrival) => setArrival(newArrival)}
                    error={arrivalError}
                    value={arrival}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <Box sx={{ flex: "1 1 0" }}>
                  <CustomInput
                    placeholder="Price*"
                    type="number"
                    onFocus={() => {
                      setPriceError("");
                    }}
                    onBlur={validatePrice}
                    onChange={(newPrice) => setPrice(Number(newPrice))}
                    error={priceError}
                    value={String(price)}
                  />
                </Box>
                <Box sx={{ flex: "1 1 0", marginLeft: "25px" }}>
                  <CustomSelect
                    sx={{
                      display: "flex",
                    }}
                    items={CURRENCIES}
                    onChange={(newCurrency) =>
                      setCurrency(newCurrency as string)
                    }
                    value={currency}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <Box sx={{ flex: "1 1 0" }}>
                  <CustomSelect
                    placeholder="Class*"
                    sx={{
                      display: "flex",
                    }}
                    items={CABIN_CLASSES}
                    onFocus={() => {
                      setCabinClassError("");
                    }}
                    onBlur={validateCabinClass}
                    onChange={(newCabinClass) =>
                      setCabinClass(newCabinClass as string)
                    }
                    error={cabinClassError}
                    value={cabinClass}
                  />
                </Box>
                <Box sx={{ flex: "1 1 0", marginLeft: "25px" }}>
                  <CustomSelect
                    placeholder="Scheduled*"
                    sx={{
                      display: "flex",
                    }}
                    items={SCHEDULED}
                    onFocus={() => {
                      setScheduledError("");
                    }}
                    onBlur={validateScheduled}
                    onChange={(newScheduled) =>
                      setScheduled(newScheduled as string)
                    }
                    error={scheduledError}
                    value={scheduled}
                  />
                </Box>
              </Box>
              <CustomInput
                sx={{ marginTop: "30px" }}
                placeholder="Airline*"
                onFocus={() => {
                  setAirlineError("");
                }}
                onBlur={validateAirline}
                onChange={(newAirline) => setAirline(newAirline as string)}
                error={airlineError}
                value={airline}
              />
              <CustomInput
                type="number"
                sx={{ marginTop: "30px" }}
                placeholder="Score*"
                onFocus={() => {
                  setScoreError("");
                }}
                onBlur={validateScore}
                onChange={(newScore) => setScore(Number(newScore))}
                error={scoreError}
                value={String(score)}
              />
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <CustomInput
                  onClick={handlePopupOpen}
                  readOnly={true}
                  sx={{ marginTop: "30px", zIndex: 3 }}
                  placeholder="Click to add image"
                  value={newFilename || ""}
                  onFocus={() => {
                    setFilenameError("");
                  }}
                  onBlur={validateFilename}
                  error={filenameError}
                />

                {newFilename && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: "5px",
                      top: "43%",
                      zIndex: 4,
                    }}
                    aria-label="remove-photo"
                    onClick={handleRemovePhoto}
                  >
                    <MdDeleteForever size={25} />
                  </IconButton>
                )}
              </Box>

              <CustomPopup onClose={handlePopupClose} open={open}>
                <Box
                  sx={{
                    width: "500px",
                    padding: "3rem",
                  }}
                >
                  <Typography
                    sx={{
                      color: DarkColor,
                      fontFamily: TitleFont,
                      fontSize: "25px",
                      marginBottom: "15px",
                    }}
                  >
                    Upload flight image
                  </Typography>
                  <UploadPhotoZone onUpload={handleUpload} />
                </Box>
              </CustomPopup>

              <Box
                sx={{
                  marginTop: "30px",
                }}
              >
                <CustomButton
                  onClick={handleSubmit}
                  title="Create flight"
                  theme={ButtonTheme.Dark}
                />
              </Box>
            </Box>
          </Container>
        </LayoutImageBg>
      </Layout>
    </>
  );
});
