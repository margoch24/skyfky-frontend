import { Box, Button, Container } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import WhiteLogo from "/assets/skyfly_white_logo.svg";
import { DarkColor } from "shared/constants/colors";
import { Link } from "react-router-dom";

import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";
import { FiMenu } from "react-icons/fi";

export const Header: FC = memo(() => {
  const [bgColor, setBgColor] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      setBgColor(scrollTop === 0 ? "" : DarkColor);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        padding: "10px 0",
        width: "100%",
        backgroundColor: showMenu ? DarkColor : bgColor,
        transition: "all 100ms ease-in-out",
        zIndex: 10,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link to="/">
            <img src={WhiteLogo} />
          </Link>
          <HeaderDesktop />

          <Button
            onClick={() => setShowMenu(!showMenu)}
            sx={{
              minWidth: "fit-content",
              padding: 0,
              display: {
                md: "none",
                xs: "block",
              },
            }}
          >
            <FiMenu color="white" size={30} />
          </Button>
        </Box>
      </Container>
      <HeaderMobile showMenu={showMenu} />
    </Box>
  );
});
