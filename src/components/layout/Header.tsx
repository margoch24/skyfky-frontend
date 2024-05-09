import { Box, Container } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import WhiteLogo from "/assets/skyfly_white_logo.svg";
import { DarkColor } from "shared/constants/colors";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, HeaderLinks, PagePath } from "shared/constants";
import { CustomLink } from "components/wrappers/CustomLink";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "common/hooks/userContext";
import { getImageHelper } from "common/helpers/getImage";

import DefaultProfilePhoto from "/assets/default_profile_photo.jpeg";

export const Header: FC = memo(() => {
  const { user } = useUserContext();
  const { pathname } = window.location;
  const authPaths: string[] = [PagePath.Login, PagePath.Register];

  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState<string>("");

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
        backgroundColor: bgColor,
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
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: "50px",
            }}
          >
            {HeaderLinks.map(({ title, path }, index) => (
              <CustomLink color="#ffff" key={index} path={path} title={title} />
            ))}

            {!authPaths.includes(pathname) && !user?.id && (
              <CustomButton
                onClick={() => navigate(PagePath.Login)}
                title="Login"
                theme={ButtonTheme.Light}
              />
            )}

            {user?.id && (
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  overflow: "hidden",
                  borderRadius: "50px",
                  border: "2px solid white",
                }}
              >
                <Link to="/account">
                  <img
                    height="100%"
                    width="100%"
                    src={
                      user?.photo
                        ? getImageHelper(user?.photo)
                        : DefaultProfilePhoto
                    }
                  />
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
});
