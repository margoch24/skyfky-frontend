import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { FC, memo } from "react";
import { Layout } from "components/layout/Layout";
import { DarkColor } from "shared/constants/colors";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme } from "shared/constants";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";

export const Page404: FC = memo(() => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "700px",
          backgroundColor: DarkColor,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          padding: "2rem",

          "@media (max-width: 350px)": {
            padding: "5rem 2rem 2rem",
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: TitleFont,
            color: "white",
            fontSize: "48px",
          }}
        >
          404: The page you are looking for isn’t here
        </Typography>
        <Typography
          sx={{
            fontFamily: SubtitleFont,
            color: "white",
            fontSize: "25px",
            opacity: "80%",
            marginTop: "2rem",
          }}
        >
          You either tried some shady route or page is under the development.
        </Typography>
        <Box
          sx={{
            marginTop: "3rem",
          }}
        >
          <CustomButton
            onClick={() => navigate(-1)}
            title="Go Back"
            theme={ButtonTheme.Light}
          />
        </Box>
      </Box>
    </Layout>
  );
});
