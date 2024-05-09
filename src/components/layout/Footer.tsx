import { Box, Container, Typography } from "@mui/material";
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
        padding: "50px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "50px",
        }}
      >
        <Box
          sx={{
            maxWidth: "500px",
          }}
        >
          <Box
            sx={{
              height: "65px",
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              width: "fit-content",
              margin: "auto",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                color: DarkColor,
                fontFamily: TitleFont,
                height: "65px",
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
        </Box>
        <Box>
          <Box
            sx={{
              width: "fit-content",
              marginLeft: "auto",
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                color: DarkColor,
                fontFamily: TitleFont,
                height: "65px",
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
        </Box>
      </Box>

      <hr
        style={{
          opacity: "50%",
          color: DarkColor,
        }}
      />

      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            color: DarkColor,
            fontFamily: SubtitleFont,
          }}
        >
          © 2024 SkyFly. All rights reserved
        </Typography>

        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: "50px",
          }}
        >
          {FooterLinks.map(({ title, path }, index) => (
            <CustomLink
              color={DarkColor}
              key={index}
              path={path}
              title={title}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
});
