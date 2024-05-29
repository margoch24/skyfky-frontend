import { Box, Button } from "@mui/material";
import { FC, memo } from "react";
import AuthBg from "/assets/authenticate/auth_bg.png";
import { TitleFont } from "shared/constants/fonts";
import { DarkBlue } from "shared/constants/colors";
import { AccountPanelPageType } from "./types";

interface PanelDesktopProps {
  currentPageKey?: string;
  handleClick: (key: string) => void;
  PanelPages: AccountPanelPageType[];
}

export const PanelDesktop: FC<PanelDesktopProps> = memo(
  ({ currentPageKey, handleClick, PanelPages }) => {
    return (
      <Box
        sx={{
          maxWidth: "300px",
          width: "300px",
          backgroundImage: `url(${AuthBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "10rem",
          minWidth: "220px",
          display: {
            md: "block",
            xs: "none",
          },
        }}
      >
        {PanelPages.map(({ key, title }) => (
          <Button
            onClick={() => handleClick(key)}
            key={key}
            sx={{
              paddingTop: "15px",
              paddingLeft: "30px",
              width: "100%",
              borderRadius: 0,
              backgroundColor: currentPageKey === key ? "white" : "transparent",
              fontFamily: TitleFont,
              fontSize: "25px",
              color: currentPageKey === key ? DarkBlue : "white",
              textTransform: "none",
              justifyContent: "left",
              ...(currentPageKey === key && {
                "&:hover": {
                  backgroundColor: "white",
                },
              }),
            }}
          >
            {title}
          </Button>
        ))}
      </Box>
    );
  }
);
