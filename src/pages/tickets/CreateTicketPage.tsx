import { FC, memo, useEffect, useRef } from "react";
import { Layout } from "components/layout/Layout";
import { Box, Container, Typography } from "@mui/material";
import AirplineWingBg from "/assets/airplane_wing_bg.png";
import { TicketCreationPanel } from "./TicketCreationPanel";
import { useLocation, useNavigate } from "react-router-dom";
import { FlightType } from "pages/flights/types";
import ProblemOccured from "/assets/problem_occured.jpg";
import { TitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, PagePath } from "shared/constants";

export const CreateTicketPage: FC = memo(() => {
  const { state } = useLocation();
  const { flight }: { flight: FlightType } = state ?? {};
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
          backgroundImage: `url(${AirplineWingBg})`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "300px",
        }}
      ></Box>

      {!flight ? (
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              margin: "5rem 0",
            }}
          >
            <img width="600px" src={ProblemOccured} />
            <Box>
              <Typography
                sx={{
                  fontSize: "25px",
                  fontFamily: TitleFont,
                  color: DarkColor,
                }}
              >
                We are sorry, but the ticket could not be booked.
                <br /> Please select a flight first.
              </Typography>
              <CustomButton
                onClick={() => navigate(PagePath.Flights)}
                sx={{ marginTop: "2rem" }}
                title="Search flights"
                theme={ButtonTheme.Dark}
              />
            </Box>
          </Box>
        </Container>
      ) : (
        <TicketCreationPanel flight={flight} />
      )}
    </Layout>
  );
});
