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

export const PrivacyPolicyPage: FC = memo(() => {
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
          Privacy Policy
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
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
            <br />
            <br />
            We use Your Personal data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with this Privacy Policy. This Privacy
            Policy has been created with the help of the Free Privacy Policy
            Generator.
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
            Interpretation and Definitions
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "28px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Interpretation
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </Typography>
          <br />
          <br />
          <Typography
            sx={{
              fontSize: "28px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Definitions
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            For the purposes of this Privacy Policy:
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
                means a unique account created for You to access our Service or
                parts of our Service.
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
                  Affiliate
                </span>{" "}
                means an entity that controls, is controlled by or is under
                common control with a party, where "control" means ownership of
                50% or more of the shares, equity interest or other securities
                entitled to vote for election of directors or other managing
                authority.
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
                  Company
                </span>{" "}
                (referred to as either "the Company", "We", "Us" or "Our" in
                this Agreement) refers to SkyFly.
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
                  Cookies
                </span>{" "}
                are small files that are placed on Your computer, mobile device
                or any other device by a website, containing the details of Your
                browsing history on that website among its many uses.
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
                  Country
                </span>{" "}
                refers to: Lithuania
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
                  Device
                </span>{" "}
                means any device that can access the Service such as a computer,
                a cellphone or a digital tablet.
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
                  Personal Data
                </span>{" "}
                is any information that relates to an identified or identifiable
                individual.
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
                  Service
                </span>{" "}
                refers to the Website.
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
                  Service Provider
                </span>{" "}
                means any natural or legal person who processes the data on
                behalf of the Company. It refers to third-party companies or
                individuals employed by the Company to facilitate the Service,
                to provide the Service on behalf of the Company, to perform
                services related to the Service or to assist the Company in
                analyzing how the Service is used.
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
                  Third-party Social Media Service
                </span>{" "}
                refers to any website or any social network website through
                which a User can log in or create an account to use the Service.
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
                  Usage Data
                </span>{" "}
                refers to data collected automatically, either generated by the
                use of the Service or from the Service infrastructure itself
                (for example, the duration of a page visit).
              </Typography>
            </ListItem>
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
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Website
                  </span>{" "}
                  refers to SkyFly, accessible from{" "}
                  <span
                    style={{
                      color: MainColor,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => navigate(PagePath.Home)}
                  >
                    http://{process.env.DOMAIN}
                  </span>
                </Typography>
              </Box>
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
                  You
                </span>{" "}
                means the individual accessing or using the Service, or the
                company, or other legal entity on behalf of which such
                individual is accessing or using the Service, as applicable.
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
            Collecting and Using Your Personal Data
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "28px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Types of Data Collected
          </Typography>

          <br />
          <Typography
            sx={{
              fontSize: "23px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Personal Data
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            While using Our Service, We may ask You to provide Us with certain
            personally identifiable information that can be used to contact or
            identify You. Personally identifiable information may include, but
            is not limited to:
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
                Email address
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
                First name and last name
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
                Phone number
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
                Usage Data
              </Typography>
            </ListItem>
          </List>

          <br />
          <Typography
            sx={{
              fontSize: "23px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Usage Data
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
              marginBottom: "20px",
            }}
          >
            Usage Data is collected automatically when using the Service.
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
              marginBottom: "20px",
            }}
          >
            Usage Data may include information such as Your Device's Internet
            Protocol address (e.g. IP address), browser type, browser version,
            the pages of our Service that You visit, the time and date of Your
            visit, the time spent on those pages, unique device identifiers and
            other diagnostic data.
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
              marginBottom: "20px",
            }}
          >
            When You access the Service by or through a mobile device, We may
            collect certain information automatically, including, but not
            limited to, the type of mobile device You use, Your mobile device
            unique ID, the IP address of Your mobile device, Your mobile
            operating system, the type of mobile Internet browser You use,
            unique device identifiers and other diagnostic data.
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            We may also collect information that Your browser sends whenever You
            visit our Service or when You access the Service by or through a
            mobile device.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "23px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Information from Third-Party Social Media Services
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            The Company allows You to create an account and log in to use the
            Service through the following Third-party Social Media Services:
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
                Google
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
                Facebook
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
                Instagram
              </Typography>
            </ListItem>
          </List>
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            If You decide to register through or otherwise grant us access to a
            Third-Party Social Media Service, We may collect Personal data that
            is already associated with Your Third-Party Social Media Service's
            account, such as Your name, Your email address, Your activities or
            Your contact list associated with that account.
            <br />
            <br />
            You may also have the option of sharing additional information with
            the Company through Your Third-Party Social Media Service's account.
            If You choose to provide such information and Personal Data, during
            registration or otherwise, You are giving the Company permission to
            use, share, and store it in a manner consistent with this Privacy
            Policy.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "23px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Tracking Technologies and Cookies
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            We use Cookies and similar tracking technologies to track the
            activity on Our Service and store certain information. Tracking
            technologies used are beacons, tags, and scripts to collect and
            track information and to improve and analyze Our Service. The
            technologies We use may include:
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
                  Cookies or Browser Cookies.
                </span>{" "}
                A cookie is a small file placed on Your Device. You can instruct
                Your browser to refuse all Cookies or to indicate when a Cookie
                is being sent. However, if You do not accept Cookies, You may
                not be able to use some parts of our Service. Unless you have
                adjusted Your browser setting so that it will refuse Cookies,
                our Service may use Cookies.
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
                  Web Beacons.
                </span>{" "}
                Certain sections of our Service and our emails may contain small
                electronic files known as web beacons (also referred to as clear
                gifs, pixel tags, and single-pixel gifs) that permit the
                Company, for example, to count users who have visited those
                pages or opened an email and for other related website
                statistics (for example, recording the popularity of a certain
                section and verifying system and server integrity).
              </Typography>
            </ListItem>
          </List>

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies
            remain on Your personal computer or mobile device when You go
            offline, while Session Cookies are deleted as soon as You close Your
            web browser. Learn more about cookies on the Free Privacy Policy
            website article.
            <br />
            <br />
            We use both Session and Persistent Cookies for the purposes set out
            below:
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
                  Necessary / Essential Cookies
                </span>{" "}
                <br />
                Type: Session Cookies
                <br />
                Administered by: Us
                <br />
                Purpose: These Cookies are essential to provide You with
                services available through the Website and to enable You to use
                some of its features. They help to authenticate users and
                prevent fraudulent use of user accounts. Without these Cookies,
                the services that You have asked for cannot be provided, and We
                only use these Cookies to provide You with those services.
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
                  Cookies Policy / Notice Acceptance Cookies
                </span>{" "}
                <br />
                Type: Persistent Cookies
                <br />
                Administered by: Us
                <br />
                Purpose: These Cookies identify if users have accepted the use
                of cookies on the Website.
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
                  Functionality Cookies
                </span>{" "}
                <br />
                Type: Persistent Cookies
                <br />
                Administered by: Us
                <br />
                Purpose: These Cookies allow us to remember choices You make
                when You use the Website, such as remembering your login details
                or language preference. The purpose of these Cookies is to
                provide You with a more personal experience and to avoid You
                having to re-enter your preferences every time You use the
                Website.
              </Typography>
            </ListItem>
          </List>

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            For more information about the cookies we use and your choices
            regarding cookies, please visit our Cookies Policy or the Cookies
            section of our Privacy Policy.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "28px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Use of Your Personal Data
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            The Company may use Personal Data for the following purposes:
          </Typography>
          <br />
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
                  To provide and maintain our Service,
                </span>{" "}
                including to monitor the usage of our Service.
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
                  To manage Your Account:
                </span>{" "}
                o manage Your registration as a user of the Service. The
                Personal Data You provide can give You access to different
                functionalities of the Service that are available to You as a
                registered user.
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
                  For the performance of a contract:
                </span>{" "}
                the development, compliance and undertaking of the purchase
                contract for the products, items or services You have purchased
                or of any other contract with Us through the Service.
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
                  To contact You:
                </span>{" "}
                To contact You by email, telephone calls, SMS, or other
                equivalent forms of electronic communication, such as a mobile
                application's push notifications regarding updates or
                informative communications related to the functionalities,
                products or contracted services, including the security updates,
                when necessary or reasonable for their implementation
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
                  To provide You
                </span>{" "}
                with news, special offers and general information about other
                goods, services and events which we offer that are similar to
                those that you have already purchased or enquired about unless
                You have opted not to receive such information.
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
                  To manage Your requests:
                </span>{" "}
                To attend and manage Your requests to Us.
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
                  For business transfers:
                </span>{" "}
                We may use Your information to evaluate or conduct a merger,
                divestiture, restructuring, reorganization, dissolution, or
                other sale or transfer of some or all of Our assets, whether as
                a going concern or as part of bankruptcy, liquidation, or
                similar proceeding, in which Personal Data held by Us about our
                Service users is among the assets transferred
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
                  For other purposes:
                </span>{" "}
                We may use Your information for other purposes, such as data
                analysis, identifying usage trends, determining the
                effectiveness of our promotional campaigns and to evaluate and
                improve our Service, products, services, marketing and your
                experience.
              </Typography>
            </ListItem>
          </List>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            We may share Your personal information in the following situations:
          </Typography>
          <br />
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
                  With Service Providers:
                </span>{" "}
                We may share Your personal information with Service Providers to
                monitor and analyze the use of our Service, to contact You.
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
                  For business transfers:
                </span>{" "}
                We may share or transfer Your personal information in connection
                with, or during negotiations of, any merger, sale of Company
                assets, financing, or acquisition of all or a portion of Our
                business to another company.
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
                  With Affiliates:
                </span>{" "}
                We may share Your information with Our affiliates, in which case
                we will require those affiliates to honor this Privacy Policy.
                Affiliates include Our parent company and any other
                subsidiaries, joint venture partners or other companies that We
                control or that are under common control with Us.
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
                  With business partners:
                </span>{" "}
                We may share Your information with Our business partners to
                offer You certain products, services or promotions.
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
                  With other users:
                </span>{" "}
                when You share personal information or otherwise interact in the
                public areas with other users, such information may be viewed by
                all users and may be publicly distributed outside. If You
                interact with other users or register through a Third-Party
                Social Media Service, Your contacts on the Third-Party Social
                Media Service may see Your name, profile, pictures and
                description of Your activity. Similarly, other users will be
                able to view descriptions of Your activity, communicate with You
                and view Your profile.
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
                  With Your consent:
                </span>{" "}
                We may disclose Your personal information for any other purpose
                with Your consent.
              </Typography>
            </ListItem>
          </List>

          <br />
          <Typography
            sx={{
              fontSize: "28px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Retention of Your Personal Data
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            The Company will retain Your Personal Data only for as long as is
            necessary for the purposes set out in this Privacy Policy. We will
            retain and use Your Personal Data to the extent necessary to comply
            with our legal obligations (for example, if we are required to
            retain your data to comply with applicable laws), resolve disputes,
            and enforce our legal agreements and policies.
            <br />
            <br />
            The Company will also retain Usage Data for internal analysis
            purposes. Usage Data is generally retained for a shorter period of
            time, except when this data is used to strengthen the security or to
            improve the functionality of Our Service, or We are legally
            obligated to retain this data for longer time periods.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "28px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Transfer of Your Personal Data
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            Your information, including Personal Data, is processed at the
            Company's operating offices and in any other places where the
            parties involved in the processing are located. It means that this
            information may be transferred to — and maintained on — computers
            located outside of Your state, province, country or other
            governmental jurisdiction where the data protection laws may differ
            than those from Your jurisdiction.
            <br />
            <br />
            Your consent to this Privacy Policy followed by Your submission of
            such information represents Your agreement to that transfer.
            <br />
            <br />
            The Company will take all steps reasonably necessary to ensure that
            Your data is treated securely and in accordance with this Privacy
            Policy and no transfer of Your Personal Data will take place to an
            organization or a country unless there are adequate controls in
            place including the security of Your data and other personal
            information.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "28px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Delete Your Personal Data
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            You have the right to delete or request that We assist in deleting
            the Personal Data that We have collected about You.
            <br />
            <br />
            Our Service may give You the ability to delete certain information
            about You from within the Service.
            <br />
            <br />
            You may update, amend, or delete Your information at any time by
            signing in to Your Account, if you have one, and visiting the
            account settings section that allows you to manage Your personal
            information. You may also contact Us to request access to, correct,
            or delete any personal information that You have provided to Us.
            <br />
            <br />
            Please note, however, that We may need to retain certain information
            when we have a legal obligation or lawful basis to do so.
          </Typography>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "28px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Disclosure of Your Personal Data
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "23px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Business Transactions
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            If the Company is involved in a merger, acquisition or asset sale,
            Your Personal Data may be transferred. We will provide notice before
            Your Personal Data is transferred and becomes subject to a different
            Privacy Policy.
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "23px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Law enforcement
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            Under certain circumstances, the Company may be required to disclose
            Your Personal Data if required to do so by law or in response to
            valid requests by public authorities (e.g. a court or a government
            agency).
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "23px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Other legal requirements
          </Typography>
          <br />
          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            The Company may disclose Your Personal Data in the good faith belief
            that such action is necessary to:
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
                Comply with a legal obligation
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
                Protect and defend the rights or property of the Company
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
                Prevent or investigate possible wrongdoing in connection with
                the Service
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
                Protect the personal safety of Users of the Service or the
                public
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
                Protect against legal liability
              </Typography>
            </ListItem>
          </List>

          <br />
          <br />
          <Typography
            sx={{
              fontSize: "28px",
              color: DarkColor,
              fontFamily: TitleFont,
              fontWeight: "600",
            }}
          >
            Security of Your Personal Data
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            The security of Your Personal Data is important to Us, but remember
            that no method of transmission over the Internet, or method of
            electronic storage is 100% secure. While We strive to use
            commercially acceptable means to protect Your Personal Data, We
            cannot guarantee its absolute security.
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
            Children's Privacy
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            Our Service does not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from anyone
            under the age of 13. If You are a parent or guardian and You are
            aware that Your child has provided Us with Personal Data, please
            contact Us. If We become aware that We have collected Personal Data
            from anyone under the age of 13 without verification of parental
            consent, We take steps to remove that information from Our servers.
            <br />
            <br />
            If We need to rely on consent as a legal basis for processing Your
            information and Your country requires consent from a parent, We may
            require Your parent's consent before We collect and use that
            information.
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
            Links to Other Websites
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            Our Service may contain links to other websites that are not
            operated by Us. If You click on a third party link, You will be
            directed to that third party's site. We strongly advise You to
            review the Privacy Policy of every site You visit.
            <br />
            <br />
            We have no control over and assume no responsibility for the
            content, privacy policies or practices of any third party sites or
            services.
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
            Changes to this Privacy Policy
          </Typography>
          <br />

          <Typography
            sx={{
              fontSize: "20px",
              color: DarkColor,
              fontFamily: SubtitleFont,
            }}
          >
            We may update Our Privacy Policy from time to time. We will notify
            You of any changes by posting the new Privacy Policy on this page.
            <br />
            <br />
            We will let You know via email and/or a prominent notice on Our
            Service, prior to the change becoming effective and update the "Last
            updated" date at the top of this Privacy Policy.
            <br />
            <br />
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
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
            If you have any questions about this Privacy Policy, You can contact
            us:
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
