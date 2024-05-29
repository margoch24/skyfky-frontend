import { Box } from "@mui/material";
import { FC, memo } from "react";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, HeaderLinks, PagePath } from "shared/constants";
import { CustomLink } from "components/wrappers/CustomLink";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "common/hooks/userContext";
import { getImageHelper } from "common/helpers/getImage";

import DefaultProfilePhoto from "/assets/default_profile_photo.jpeg";
import { AccountPanelPagesKeys } from "pages/account/constants";

export const HeaderDesktop: FC = memo(() => {
  const { user } = useUserContext();
  const { pathname } = window.location;
  const authPaths: string[] = [PagePath.Login, PagePath.Register];

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        alignItems: "center",
        display: {
          md: "flex",
          xs: "none",
        },
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
          <Link
            to={`${PagePath.Account}?pageKey=${AccountPanelPagesKeys.Profile}`}
          >
            <img
              height="100%"
              width="100%"
              src={
                user?.photo ? getImageHelper(user?.photo) : DefaultProfilePhoto
              }
            />
          </Link>
        </Box>
      )}
    </Box>
  );
});
