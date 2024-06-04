import { SxProps } from "@mui/material";
import { FC, memo } from "react";
import { ButtonTheme } from "shared/constants";
import { Button } from "@mui/material";
import { SubtitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";

export const CustomButton: FC<{
  title: string;
  onClick?: () => void;
  theme?: string;
  sx?: SxProps;
  disabled?: boolean;
}> = memo(({ title, onClick, theme = ButtonTheme.Dark, sx = {}, disabled }) => {
  const buttonSx = { ...ButtonThemes[theme], ...sx };
  return (
    <Button
      disabled={disabled}
      variant="contained"
      sx={{
        borderRadius: 0,
        paddingRight: "40px",
        paddingLeft: "40px",
        fontSize: "18px",
        textTransform: "none",
        fontFamily: SubtitleFont,
        minHeight: "45px",
        boxShadow: "none",

        ...buttonSx,
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
});

const ButtonThemes: {
  [key in string]: SxProps;
} = {
  [ButtonTheme.Dark]: {
    backgroundColor: DarkColor,
    color: "white",
    "&:hover": {
      backgroundColor: DarkColor,
    },
  },
  [ButtonTheme.Light]: {
    backgroundColor: "white",
    color: DarkColor,
    "&:hover": {
      backgroundColor: "white",
      color: DarkColor,
    },
  },
  [ButtonTheme.Transparent]: {
    color: DarkColor,
    border: `1px solid ${DarkColor}`,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: DarkColor,
      color: "white",
    },
  },
};
