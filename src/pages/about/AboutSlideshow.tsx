import { Box, Container, Typography } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { SlideshowItems } from "./constants";
import { DarkBlue } from "shared/constants/colors";
import { SecondTitleFont } from "shared/constants/fonts";

export const AboutSlideshow: FC = memo(() => {
  const ImageWidth = 550;
  const ImageMargin = 48;
  const ImageSmallMargin = 0;

  const [ImageSmallWidth, setImageSmallWidth] = useState(
    window.innerWidth - 32
  );
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setImageSmallWidth(newWidth - 32);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItemIndex((prevIndex) =>
        prevIndex + 1 === SlideshowItems.length ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newTranslateX =
      window.innerWidth <= 600
        ? (ImageSmallMargin + ImageSmallWidth) * currentItemIndex
        : (ImageWidth + ImageMargin) * currentItemIndex;
    setTranslateX(newTranslateX);
  }, [currentItemIndex, ImageSmallWidth]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: {
          md: "row",
          xs: "column-reverse",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: {
            md: "6rem 0 2rem",
            xs: "0 0 2rem",
          },
          flex: "1 1 0",
          minHeight: {
            md: "auto",
            xs: "200px",
          },

          "@media (max-width: 400px)": {
            minHeight: "320px",
          },
        }}
      >
        <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "48px",
              fontFamily: SecondTitleFont,
              margin: "1rem 3rem 0 auto",
              maxWidth: "500px",

              "@media (max-width: 1124px)": {
                position: "absolute",
                minWidth: "350px",
                zIndex: "2",
              },

              "@media (max-width: 900px)": {
                position: "unset",
                minWidth: "auto",
                zIndex: "2",
                margin: "auto",
                textAlign: "center",
              },
            }}
          >
            {SlideshowItems[currentItemIndex]?.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            marginTop: {
              md: 0,
              xs: "1rem",
            },
            "@media (max-width: 400px)": {
              margin: "1rem auto 0",
              paddingLeft: "30px",
            },

            "@media (max-width: 350px)": {
              margin: "0",
              paddingLeft: "30px",
            },
          }}
        >
          {SlideshowItems?.map((_, index) => (
            <Box
              sx={{
                width: "80px",
                borderTop:
                  currentItemIndex === index
                    ? `4px solid ${DarkBlue}`
                    : "2px solid white",
                marginRight: "50px",

                "@media (max-width: 1124px)": {
                  width: "45px",
                  marginRight: "30px",
                },
              }}
              key={index}
            ></Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: {
            md: "800px",
            xs: "inherit",
          },
          overflow: "hidden",
          margin: "6rem 0 2rem auto",
          width: {
            md: "auto",
            xs: "inherit",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            transform: `translateX(-${translateX}px)`,
            transition: "all 500ms ease-in-out",
          }}
        >
          {SlideshowItems?.map(({ image }, index) => (
            <Box
              sx={{
                marginRight: {
                  sm: `${ImageMargin}px`,
                  xs: `${ImageSmallMargin}px`,
                },
                height: "350px",
                width: {
                  sm: `${ImageWidth}px`,
                  xs: `${ImageSmallWidth}px`,
                },

                "@media (max-width: 400px)": {
                  height: "250px",
                },
              }}
              key={index}
            >
              <img
                style={{
                  width: "inherit",
                  height: "inherit",
                  borderRadius: "30px",
                }}
                src={image}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
});
