import {
  Autocomplete,
  Box,
  CircularProgress,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback } from "react";
import { SubtitleFont } from "shared/constants/fonts";
import { DarkColor, GreyColor } from "shared/constants/colors";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { debounce } from "common/helpers/debounce";
import { MapboxPlaceType, MapboxResponse, QueryKeys } from "common/types";
import { getMapboxPlaces } from "api/requests/flights/getMapboxPlaces";

interface PlacesSearchAutocompleteProps {
  sx?: SxProps;
  label: string;
  onChange?: (value: string | MapboxPlaceType | null) => void;
  onInputChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  value?: MapboxPlaceType | null;
  inputValue?: string;
  error?: string;
}

export const PlacesSearchAutocomplete: FC<PlacesSearchAutocompleteProps> = memo(
  ({
    sx,
    label,
    onChange,
    onBlur,
    onFocus,
    onInputChange,
    error,
    inputValue,
  }) => {
    const fetchFunc = useCallback(async () => {
      return await getMapboxPlaces({
        inputValue: inputValue?.toLowerCase(),
      });
    }, [inputValue]);

    const { data, isLoading } = useQuery<AxiosResponse<MapboxResponse>>({
      queryKey: [QueryKeys.GetPlaces, inputValue],
      queryFn: () => debounce(fetchFunc(), 500),
      enabled: (inputValue ?? "").length >= 3,
      refetchOnWindowFocus: false,
    });

    const places = data?.data?.features || [];

    const handleInputChange = (
      _: React.SyntheticEvent<Element, Event>,
      newInputValue: string
    ) => {
      onInputChange?.(newInputValue);
    };

    const handleChange = (
      _: React.SyntheticEvent<Element, Event>,
      value: string | MapboxPlaceType | null
    ) => {
      onChange?.(value);
    };

    const handleFocus = () => {
      onFocus?.();
    };

    const handleBlur = () => {
      onBlur?.();
    };
    console.log(places);

    return (
      <Box
        sx={{
          "& .MuiAutocomplete-popper": {
            zIndex: 5,
          },
        }}
      >
        <Autocomplete
          disablePortal
          sx={sx}
          freeSolo
          options={places}
          loading={isLoading}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          getOptionLabel={(option: string | MapboxPlaceType) =>
            typeof option === "string" ? option : option.properties.full_address
          }
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              sx={{
                backgroundColor: "white",
                borderRadius: 0,
                opacity: "80%",
                boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.25)",

                height: "45px",
                width: "100%",

                "&.Mui-focused": {
                  border: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiInputBase-root": {
                  height: "inherit",
                  borderRadius: 0,
                },
                "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                  {
                    color: GreyColor,
                  },
                verticalAlign: "inherit",
                "& .MuiInputBase-input": {
                  fontFamily: SubtitleFont,
                  fontSize: "18px",
                },
                "& .MuiFormLabel-root, & .MuiInputLabel-root": {
                  color: GreyColor,
                  fontFamily: SubtitleFont,
                  fontSize: "18px",
                },
                "& .MuiInputLabel-formControl": {
                  top: "-6px",
                  left: "1px",
                },
                "& .MuiAutocomplete-input": {
                  marginTop: "-6px",
                  marginLeft: "1px",
                },
              }}
              {...params}
              label={label}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            return (
              <Box
                component="li"
                {...props}
                key={option.id}
                sx={{
                  fontFamily: SubtitleFont,
                  textAlign: "left",
                  color: DarkColor,
                  paddingLeft: "1rem",
                }}
              >
                {option.properties.full_address}
              </Box>
            );
          }}
        />

        <Typography
          sx={{
            fontSize: "18px",
            color: "darkred",
            fontFamily: SubtitleFont,
            textAlign: "right",
          }}
        >
          {error}
        </Typography>
      </Box>
    );
  }
);
