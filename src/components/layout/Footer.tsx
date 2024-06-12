import { Box, Container, Grid, Typography } from "@mui/material";
import { FC, memo } from "react";
import BlackLogo from "/assets/skyfly_black_logo.svg";
import { DarkColor, MainColor, SubtitleColor } from "shared/constants/colors";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { CustomLink } from "components/wrappers/CustomLink";
import {
  FaLinkedin,
  FaFacebookSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FooterLinks } from "shared/constants";

export const Footer: FC = memo(() => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: {
          sm: "50px 24px",
          xs: "50px 16px",
        },
      }}
    >
      <Grid
        sx={{
          marginBottom: "3rem",
        }}
        container
        columnSpacing={3}
        rowSpacing={{
          xs: 5,
          md: 0,
        }}
      >
        <Grid item md={4} xs={12}>
          <Box
            sx={{
              height: "65px",
              marginTop: "-2px",
            }}
          >
            <img src={BlackLogo} />
          </Box>
          <Typography
            sx={{
              fontFamily: SubtitleFont,
              color: SubtitleColor,
              fontSize: "18px",
            }}
            variant="inherit"
          >
            SkyFly - Your ultimate travel companion for seamless flight
            bookings. Discover, compare, and reserve flights effortlessly with
            our user-friendly app. Experience the sky with SkyFly!
          </Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box
            sx={{
              width: "fit-content",
              marginLeft: {
                md: "auto",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                color: DarkColor,
                fontFamily: TitleFont,
                height: {
                  md: "65px",
                  xs: "50px",
                },
              }}
            >
              Contact Us
            </Typography>

            <CustomLink
              color={SubtitleColor}
              path="mailto:skyfly@official.com"
              title="skyfly@official.com"
              font={TitleFont}
            />

            <CustomLink
              color={SubtitleColor}
              path="tel:+3706458733"
              title="+3706458733"
              font={TitleFont}
              sx={{
                marginTop: "13px",
              }}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box
            sx={{
              width: "fit-content",
              marginLeft: {
                md: "auto",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                color: DarkColor,
                fontFamily: TitleFont,
                height: {
                  md: "65px",
                  xs: "50px",
                },
              }}
            >
              Follow Us
            </Typography>

            <Box>
              <Link to="https://facebook.com" target="_blank">
                <FaFacebookSquare size={45} color={MainColor} />
              </Link>
              <FaLinkedin
                style={{ marginLeft: "30px" }}
                size={45}
                color={MainColor}
              />
              <FaInstagramSquare
                style={{ marginLeft: "30px" }}
                size={45}
                color={MainColor}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <hr
        style={{
          opacity: "50%",
          color: DarkColor,
        }}
      />

      <Grid
        container
        sx={{
          marginTop: "30px",
          justifyContent: {
            md: "space-between",
          },
          flexDirection: {
            md: "row",
            xs: "column",
          },
        }}
      >
        <Grid item>
          <Typography
            sx={{
              fontSize: "18px",
              color: DarkColor,
              fontFamily: SubtitleFont,
              marginTop: "-2px",
            }}
          >
            © 2024 SkyFly. All rights reserved
          </Typography>
        </Grid>

        <Grid
          item
          sx={{
            marginTop: {
              xs: "30px",
              md: 0,
            },
          }}
        >
          <Grid
            columnSpacing={8}
            rowSpacing={2}
            container
            sx={{
              justifyContent: {
                md: "space-between",
              },
              flexDirection: {
                md: "row",
                xs: "column",
              },
            }}
          >
            {FooterLinks.map(({ title, path }, index) => (
              <Grid key={index} item>
                <CustomLink color={DarkColor} path={path} title={title} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
});
