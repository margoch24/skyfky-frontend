import { Box, Button, Input, SxProps } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { DarkColor } from "shared/constants/colors";
import { SubtitleFont } from "shared/constants/fonts";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface CustomNumberInputProps {
  placeholder: string;
  sx?: SxProps;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export const CustomNumberInput: FC<CustomNumberInputProps> = memo(
  ({
    placeholder,
    sx,
    value = 0,
    min = 0,
    max = 100,
    onChange,
    onIncrease,
    onDecrease,
  }) => {
    const [newValue, setNewValue] = useState<number>(value);

    useEffect(() => {
      onChange?.(newValue);
    }, [newValue, onChange]);

    const increaseValue = () => {
      if (value >= max) {
        return;
      }

      setNewValue((prevValue) =>
        prevValue >= max ? prevValue : prevValue + 1
      );

      onIncrease?.();
    };

    const decreaseValue = () => {
      if (value <= min) {
        return;
      }

      setNewValue((prevValue) =>
        prevValue <= min ? prevValue : prevValue - 1
      );

      onDecrease?.();
    };

    return (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          sx={{
            minWidth: "fit-content",
            paddingRight: "20px",
          }}
          onClick={decreaseValue}
        >
          <FaMinus size={20} color={DarkColor} />
        </Button>
        <Input
          readOnly={true}
          disableUnderline={true}
          placeholder={placeholder}
          sx={{
            backgroundColor: "white",
            borderRadius: 0,
            opacity: "80%",
            "& .MuiInputBase-input": {
              fontFamily: SubtitleFont,
              fontSize: "18px",
            },
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
            border: "2px solid #F5F5F5",
            height: "45px",
            maxWidth: "50px",
            minWidth: "50px",
            "& .MuiInputBase-input.MuiInput-input": {
              textAlign: "center",
            },
            ...sx,
          }}
          value={newValue}
        />
        <Button
          sx={{
            minWidth: "fit-content",
            paddingLeft: "20px",
          }}
          onClick={increaseValue}
        >
          <FaPlus size={20} color={DarkColor} />
        </Button>
      </Box>
    );
  }
);
