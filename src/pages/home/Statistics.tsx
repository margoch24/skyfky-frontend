import { LayoutImageBg } from "components/layout/LayoutImageBg";
import { FC, memo } from "react";

import StatisticsBg from "/assets/home/statistics_bg.png";
import { Box, Container, Typography } from "@mui/material";
import { SecondTitleFont, SubtitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { StatisticsData } from "shared/constants";

export const Statistics: FC = memo(() => {
  return (
    <>
      <LayoutImageBg bgImage={StatisticsBg} height="300px">
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "auto",
            gap: "15rem",
          }}
        >
          {StatisticsData.map(({ key, value }, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "36px",
                  fontFamily: SecondTitleFont,
                  color: DarkColor,
                }}
              >
                {value}
              </Typography>

              <Typography
                sx={{
                  fontSize: "20px",
                  fontFamily: SubtitleFont,
                  color: DarkColor,
                  opacity: "80%",
                }}
              >
                {key}
              </Typography>
            </Box>
          ))}
        </Container>
      </LayoutImageBg>
    </>
  );
});
