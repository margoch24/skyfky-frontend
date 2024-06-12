import { Layout } from "components/layout/Layout";
import { FC, memo, useEffect, useRef } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { DarkColor, MainColor } from "shared/constants/colors";
import { Divider } from "components/wrappers/Divider";
import {
  SecondTitleFont,
  SubtitleFont,
  TitleFont,
} from "shared/constants/fonts";
import { useNavigate } from "react-router-dom";
import { PagePath } from "shared/constants";

export const TermsConditionsPage: FC = memo(() => {
  const navigate = useNavigate();
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
          minHeight: "300px",
          backgroundColor: DarkColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "48px",
            fontFamily: SecondTitleFont,
            marginTop: "1rem",
          }}
        >
          Terms & Conditions
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: DarkColor,
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
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            Welcome to SkyFly! By using our flight ticket reservation app
            ("App"), you agree to comply with and be bound by the following
            terms and conditions ("Terms"). Please review these Terms carefully
            before using the App.
          </Typography>
          <br />
          <br />
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Acceptance of Terms
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            By accessing or using SkyFly, you agree to be bound by these Terms
            and our Privacy Policy. If you do not agree to these Terms, please
            do not use the App.
          </Typography>
          <br />
          <br />
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Use of the App
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: DarkColor,
                  fontFamily: SubtitleFont,
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Account
                </span>{" "}
                You may need to create an account to access certain features.
                You are responsible for maintaining the confidentiality of your
                account information and for all activities that occur under your
                account.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: DarkColor,
                  fontFamily: SubtitleFont,
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Prohibited Activities
                </span>{" "}
                You agree not to misuse the App, including but not limited to:
                <br />
                Using the App for any unlawful purpose.
                <br />
                Attempting to interfere with or disrupt the App.
              </Typography>
            </ListItem>
          </List>
          <br />
          <br />
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Booking and Payments
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: DarkColor,
                  fontFamily: SubtitleFont,
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Booking
                </span>{" "}
                SkyFly allows you to search, compare, and book flight tickets.
                Once a booking is confirmed, you will receive a confirmation
                email with your flight details.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: DarkColor,
                  fontFamily: SubtitleFont,
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Payments
                </span>{" "}
                All payments must be made at the time of booking. We accept
                various payment methods, as detailed in the App.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: DarkColor,
                  fontFamily: SubtitleFont,
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Cancellations and Refunds:
                </span>{" "}
                Cancellation and refund policies are subject to the terms and
                conditions of the airline with which you booked. SkyFly is not
                responsible for airline policies regarding cancellations or
                refunds.
              </Typography>
            </ListItem>
          </List>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Prices and Fees
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: DarkColor,
                  fontFamily: SubtitleFont,
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Pricing
                </span>{" "}
                Prices for flights are displayed in the App and are subject to
                change. We strive to ensure accuracy but cannot guarantee that
                all pricing information is up-to-date.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: DarkColor,
                  fontFamily: SubtitleFont,
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Fees
                </span>{" "}
                Any additional fees (e.g., baggage fees, seat selection fees)
                will be disclosed at the time of booking.
              </Typography>
            </ListItem>
          </List>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Intellectual Property
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            All content and materials in the App, including text, graphics,
            logos, and software, are the property of SkyFly or its licensors and
            are protected by copyright, trademark, and other intellectual
            property laws.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Disclaimer of Warranties
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            SkyFly is provided on an "as-is" and "as-available" basis. We make
            no warranties or representations regarding the accuracy or
            completeness of the content in the App.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Limitation of Liability
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            To the fullest extent permitted by law, SkyFly shall not be liable
            for any direct, indirect, incidental, special, or consequential
            damages resulting from your use of or inability to use the App.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Changes to Terms
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            We may modify these Terms at any time. Any changes will be effective
            immediately upon posting. Your continued use of the App after the
            posting of changes constitutes your acceptance of such changes.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Governing Law
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            These Terms shall be governed by and construed in accordance with
            the laws of Lithuania, without regard to its conflict of law
            principles.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "34px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Contact Us
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            If you have any questions about this Terms, You can contact us:
          </Typography>

          <List sx={{ listStyleType: "disc", pl: 4 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Box
                sx={{
                  wordBreak: "break-word",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: DarkColor,
                    fontFamily: SubtitleFont,
                  }}
                >
                  By visiting this page on our website:{" "}
                  <span
                    style={{
                      color: MainColor,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => navigate(PagePath.ContactUs)}
                  >
                    http://{process.env.DOMAIN}/contact-us
                  </span>
                </Typography>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Divider />
    </Layout>
  );
});
