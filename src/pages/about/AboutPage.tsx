import { Layout } from "components/layout/Layout";
import { FC, memo, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { DarkColor } from "shared/constants/colors";
import { Divider } from "components/wrappers/Divider";
import { SubtitleFont, TitleFont } from "shared/constants/fonts";
import { AboutSlideshow } from "./AboutSlideshow";

export const AboutPage: FC = memo(() => {
  const isPageLoaded = useRef(false);

  useEffect(() => {
    if (!isPageLoaded.current) {
      window.scrollTo(0, 0);
    }

    isPageLoaded.current = true;
  });

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          minHeight: "450px",
          backgroundColor: DarkColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        <AboutSlideshow />
      </Box>

      <Box
        sx={{
          backgroundColor: DarkColor,
          marginTop: "-1px",
        }}
      >
        <Box
          sx={{
            padding: {
              sm: "5rem",
              xs: "4rem 2rem",
            },
            borderTopLeftRadius: "70px",
            borderTopRightRadius: "70px",
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Some information about us
          </Typography>
          <br />
          <br />
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            Welcome to SkyFly, your ultimate destination for hassle-free flight
            reservations. At SkyFly, we believe that booking flights should be
            as smooth as a gentle breeze, ensuring that your journey starts with
            ease and comfort right from the moment you decide to take off.
            <br />
            <br />
            Founded with a passion for simplifying travel experiences, SkyFly is
            dedicated to providing travelers with a seamless platform to
            explore, compare, and book flights to their desired destinations.
            Whether you're planning a spontaneous getaway, a business trip, or a
            long-awaited vacation, SkyFly is here to make your travel dreams a
            reality.
            <br />
            <br />
            What sets SkyFly apart is our commitment to delivering exceptional
            customer service and unmatched convenience. Our user-friendly
            interface and intuitive search tools empower you to find the best
            flight deals tailored to your preferences and budget effortlessly.
            With just a few clicks, you can browse through a wide range of
            airlines, departure times, and fare options, ensuring that you find
            the perfect flight to suit your needs.
            <br />
            <br />
            At SkyFly, we understand that every journey is unique, which is why
            we go above and beyond to cater to your individual requirements.
            Whether you're looking for flexibility in your travel dates, special
            accommodations, or personalized recommendations, our dedicated team
            of travel experts is here to assist you every step of the way.
            <br />
            <br />
            With SkyFly, booking flights is not just a transaction; it's an
            experience. We strive to exceed your expectations and make your
            travel planning process as seamless and enjoyable as possible. Trust
            SkyFly to be your reliable companion in the skies, where booking
            flights truly is a breeze.
            <br />
            <br />
            Thank you for choosing SkyFly for your travel needs. We look forward
            to helping you embark on your next adventure!
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Layout>
  );
});
