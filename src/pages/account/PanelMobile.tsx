import { Box, Button } from "@mui/material";
import { FC, memo, useState } from "react";
import AuthBg from "/assets/authenticate/auth_bg.png";
import { TitleFont } from "shared/constants/fonts";
import { DarkBlue } from "shared/constants/colors";
import { AccountPanelPageType } from "./types";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface PanelMobileProps {
  currentPageKey?: string;
  handleClick: (key: string) => void;
  PanelPages: AccountPanelPageType[];
}

export const PanelMobile: FC<PanelMobileProps> = memo(
  ({ currentPageKey, handleClick, PanelPages }) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showPanel, setShowPanel] = useState<boolean>(false);

    const handleShowMenuClick = () => {
      setShowMenu(!showMenu);

      if (showPanel) {
        setShowPanel(!showPanel);
      } else {
        setTimeout(() => {
          setShowPanel(!showPanel);
        }, 200);
      }
    };

    const handlePanelButtonClick = (key: string) => {
      handleClick(key);
      setShowMenu(false);
      setShowPanel(false);
    };

    return (
      <Box
        sx={{
          ...(showMenu
            ? { minWidth: "230px", width: "350px" }
            : { minWidth: "50px", width: "50px" }),
          backgroundImage: `url(${AuthBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transition: "all 200ms ease-in-out",
          display: {
            md: "none",
            xs: "block",
          },
        }}
      >
        <Button
          onClick={handleShowMenuClick}
          sx={{
            marginTop: "2rem",
            minWidth: "30px",
          }}
        >
          {showMenu ? (
            <IoIosArrowBack size={30} color="white" />
          ) : (
            <IoIosArrowForward size={30} color="white" />
          )}
        </Button>

        {showPanel && (
          <Box
            sx={{
              marginTop: "5rem",
            }}
          >
            {PanelPages.map(({ key, title }) => (
              <Button
                onClick={() => handlePanelButtonClick(key)}
                key={key}
                sx={{
                  paddingTop: "15px",
                  paddingLeft: "30px",
                  width: "100%",
                  borderRadius: 0,
                  backgroundColor:
                    currentPageKey === key ? "white" : "transparent",
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
        )}
      </Box>
    );
  }
);
