import { Box, SxProps, Typography } from "@mui/material";
import { FC, memo } from "react";
import { SubtitleFont } from "shared/constants/fonts";
import { Textarea } from "@mui/joy";

interface CustomInputProps {
  placeholder: string;
  sx?: SxProps;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onClick?: () => void;
  error?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const CustomTextArea: FC<CustomInputProps> = memo(
  ({
    placeholder,
    sx,
    onChange,
    onBlur,
    onFocus,
    value,
    error,
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
        <Textarea
          minRows={10}
          readOnly={readOnly}
          disabled={disabled}
          placeholder={placeholder}
          sx={{
            paddingLeft: "15px",
            paddingRight: "15px",
            backgroundColor: "white",
            borderRadius: 0,
            opacity: "80%",
            height: "100%",
            fontFamily: SubtitleFont,
            fontSize: "18px",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.25)",
            border: "2px solid #F5F5F5",
            ...sx,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => handleOnChange(e.target.value)}
          onClick={handleClick}
          value={value}
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
