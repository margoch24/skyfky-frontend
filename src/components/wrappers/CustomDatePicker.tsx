import { Box, SxProps, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { FC, memo } from "react";
import { GreyColor } from "shared/constants/colors";
import { SubtitleFont } from "shared/constants/fonts";

interface CustomDatePickerProps {
  label?: string;
  sx?: SxProps;
  onChange?: (value: Date | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onAccept?: () => void;
  error?: string;
  value: Date | null;
}

export const CustomDatePicker: FC<CustomDatePickerProps> = memo(
  ({ sx = {}, label, onChange, onBlur, onFocus, onAccept, error, value }) => {
    const handleChange = (value: Date | null) => {
      onChange?.(value);
    };

    const handleBlur = () => {
      onBlur?.();
    };

    const handleFocus = () => {
      onFocus?.();
    };

    const handleAccept = () => {
      onAccept?.();
    };
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <DatePicker
          views={["year", "month", "day"]}
          onChange={handleChange}
          onAccept={handleAccept}
          slotProps={{
            textField: {
              onFocus: handleFocus,
              onBlur: handleBlur,
            },
          }}
          value={value}
          sx={{
            backgroundColor: "white",
            borderRadius: 0,
            opacity: "80%",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.25)",
            border: "2px solid #F5F5F5",

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
            "& .MuiInputBase-input": {
              fontFamily: SubtitleFont,
              fontSize: "18px",
              marginLeft: "1px",
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
            "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
              color: GreyColor,
            },
            ...sx,
            verticalAlign: "inherit",
          }}
          label={label}
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
