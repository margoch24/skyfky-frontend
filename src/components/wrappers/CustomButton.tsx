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
}> = memo(({ title, onClick, theme = ButtonTheme.Dark }) => {
  const sx = ButtonThemes[theme];
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: 0,
        paddingRight: "40px",
        paddingLeft: "40px",
        fontSize: "18px",
        textTransform: "none",
        fontFamily: SubtitleFont,
        height: "45px",
        boxShadow: "none",
        ...sx,
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
