import { FC, memo } from "react";

import { Container, Typography } from "@mui/material";
import { TitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme } from "shared/constants";

export const PopularFlights: FC = memo(() => {
  return (
    <>
      <Container
        sx={{
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: DarkColor,
            fontFamily: TitleFont,
            fontSize: "30px",
          }}
        >
          Our popular <b>flights</b>
        </Typography>

        <CustomButton title="Search More" theme={ButtonTheme.Transparent} />
      </Container>
    </>
  );
});
