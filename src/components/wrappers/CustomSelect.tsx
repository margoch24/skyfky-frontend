import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Typography,
} from "@mui/material";
import { FC, memo } from "react";
import { GreyColor } from "shared/constants/colors";
import { SubtitleFont } from "shared/constants/fonts";

interface CustomSelectProps {
  sx?: SxProps;
  label?: string;
  defaultValue?: string | number;
  items: {
    value: string | number;
    label: string;
    default?: boolean;
  }[];
  placeholder?: string;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  value?: string;
  error?: string;
}

export const CustomSelect: FC<CustomSelectProps> = memo(
  ({
    sx = {},
    items,
    label,
    defaultValue,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    value,
    error,
  }) => {
    const newDefaultValue = placeholder
      ? ""
      : defaultValue || items.find((item) => item?.default)?.value;

    const handleFocus = () => {
      onFocus?.();
    };

    const handleBlur = () => {
      onBlur?.();
    };

    const handleChange = (event: SelectChangeEvent<string | number>) => {
      onChange?.(event.target.value);
    };
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Select
          sx={{
            paddingLeft: "15px",
            paddingRight: "15px",
            backgroundColor: "white",
            borderRadius: 0,
            opacity: "80%",
            "& .MuiInputBase-input": {
              fontFamily: SubtitleFont,
              fontSize: "18px",
            },
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.25)",
            height: "45px",
            ...(placeholder && { textAlign: "left", paddingLeft: "1px" }),
            ...sx,
          }}
          label={label}
          displayEmpty={!!placeholder}
          defaultValue={newDefaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
        >
          {placeholder && (
            <MenuItem key="placeholder" value="">
              <em style={{ color: GreyColor }}>{placeholder}</em>
            </MenuItem>
          )}
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
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
