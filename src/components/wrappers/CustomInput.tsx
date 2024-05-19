import {
  Box,
  Input,
  InputBaseComponentProps,
  SxProps,
  Typography,
} from "@mui/material";
import { FC, ReactNode, memo } from "react";
import { SubtitleFont } from "shared/constants/fonts";

interface CustomInputProps {
  placeholder: string;
  sx?: SxProps;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onClick?: () => void;
  error?: string;
  value?: string;
  type?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  inputProps?: InputBaseComponentProps;
  disabled?: boolean;
  readOnly?: boolean;
}

export const CustomInput: FC<CustomInputProps> = memo(
  ({
    placeholder,
    sx,
    onChange,
    onBlur,
    onFocus,
    value,
    error,
    type = "text",
    startAdornment,
    endAdornment,
    inputProps,
    onClick,
    disabled = false,
    readOnly,
  }) => {
    const handleFocus = () => {
      onFocus?.();
    };

    const handleBlur = () => {
      onBlur?.();
    };

    const handleClick = () => {
      onClick?.();
    };

    const handleOnChange = (value: string | number) => {
      onChange?.(value);
    };

    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Input
          readOnly={readOnly}
          disabled={disabled}
          inputProps={inputProps}
          endAdornment={endAdornment}
          startAdornment={startAdornment}
          disableUnderline={true}
          placeholder={placeholder}
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
            border: "2px solid #F5F5F5",
            height: "45px",
            ...sx,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => handleOnChange(e.target.value)}
          onClick={handleClick}
          value={value}
          type={type}
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
