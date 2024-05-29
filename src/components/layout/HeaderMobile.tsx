import { Box, Typography } from "@mui/material";
import { FC, memo } from "react";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, HeaderLinks, PagePath } from "shared/constants";
import { CustomLink } from "components/wrappers/CustomLink";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "common/hooks/userContext";
import { getImageHelper } from "common/helpers/getImage";

import DefaultProfilePhoto from "/assets/default_profile_photo.jpeg";
import { AccountPanelPagesKeys } from "pages/account/constants";

import { SubtitleFont } from "shared/constants/fonts";

interface HeaderMobileProps {
  showMenu: boolean;
}

export const HeaderMobile: FC<HeaderMobileProps> = memo(({ showMenu }) => {
  const { user } = useUserContext();
  const { pathname } = window.location;
  const authPaths: string[] = [PagePath.Login, PagePath.Register];

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: showMenu
          ? {
              md: "none",
              xs: "flex",
            }
          : "none",
        textAlign: "center",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "-5rem",
      }}
    >
      {HeaderLinks.map(({ title, path }, index) => (
        <CustomLink
          sx={{
            "& a p": {
              fontSize: "22px",
            },
            marginBottom: "3rem",
          }}
          color="#ffff"
          key={index}
          path={path}
          title={title}
        />
      ))}

      {!authPaths.includes(pathname) && !user?.id && (
        <CustomButton
          sx={{
            margin: "0.5rem auto 2rem",
          }}
          onClick={() => navigate(PagePath.Login)}
          title="Login"
          theme={ButtonTheme.Light}
        />
      )}

      {user?.id && (
        <Link
          to={`${PagePath.Account}?pageKey=${AccountPanelPagesKeys.Profile}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <Typography
            sx={{
              marginRight: "1rem",
              fontFamily: SubtitleFont,
              color: "white",
              fontSize: "22px",
            }}
          >
            {user.name}
          </Typography>
          <Box
            sx={{
              width: "50px",
              height: "50px",
              overflow: "hidden",
              borderRadius: "50px",
              border: "2px solid white",
            }}
          >
            <img
              height="100%"
              width="100%"
              src={
                user?.photo ? getImageHelper(user?.photo) : DefaultProfilePhoto
              }
            />
          </Box>
        </Link>
      )}
    </Box>
    // <Box
    //   sx={{
    //     alignItems: "center",
    //     display: {
    //       md: "flex",
    //       xs: "none",
    //     },
    //     flexDirection: "row",
    //     gap: "50px",
    //   }}
    // >
    //   {HeaderLinks.map(({ title, path }, index) => (
    //     <CustomLink color="#ffff" key={index} path={path} title={title} />
    //   ))}

    //   {!authPaths.includes(pathname) && !user?.id && (
    //     <CustomButton
    //       onClick={() => navigate(PagePath.Login)}
    //       title="Login"
    //       theme={ButtonTheme.Light}
    //     />
    //   )}

    //   {user?.id && (
    //     <Box
    //       sx={{
    //         width: "50px",
    //         height: "50px",
    //         overflow: "hidden",
    //         borderRadius: "50px",
    //         border: "2px solid white",
    //       }}
    //     >
    //       <Link
    //         to={`${PagePath.Account}?pageKey=${AccountPanelPagesKeys.Profile}`}
    //       >
    //         <img
    //           height="100%"
    //           width="100%"
    //           src={
    //             user?.photo ? getImageHelper(user?.photo) : DefaultProfilePhoto
    //           }
    //         />
    //       </Link>
    //     </Box>
    //   )}
    // </Box>
  );
});
