import { LayoutImageBg } from "components/layout/LayoutImageBg";
import { FC, memo } from "react";

import StatisticsBg from "/assets/home/statistics_bg.png";
import { Grid, Typography } from "@mui/material";
import { SecondTitleFont, SubtitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { StatisticsData } from "shared/constants";

export const Statistics: FC = memo(() => {
  return (
    <>
      <LayoutImageBg
        bgImage={StatisticsBg}
        sx={{
          minHeight: "300px",
        }}
      >
        <Grid
          container
          sx={{
            maxWidth: "1536px",
            margin: {
              sm: "auto",
              xs: "1rem auto 4rem",
            },
          }}
          rowSpacing={{
            sm: 0,
            xs: 6,
          }}
        >
          {StatisticsData.map(({ key, value }, index) => (
            <Grid
              item
              key={index}
              sm={12 / StatisticsData.length}
              xs={12}
              sx={{
                textAlign: "center",
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
            </Grid>
          ))}
        </Grid>
      </LayoutImageBg>
    </>
  );
});
