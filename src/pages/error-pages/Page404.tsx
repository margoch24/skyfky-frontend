import { useNavigate } from "react-router-dom";

import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { FC, memo } from "react";

export const Page404: FC = memo(() => {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100%",
        height: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            {/* <img
              alt="Page not found"
              src={Image404}
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 400,
              }}
            /> */}
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="text.secondary" variant="body1">
            You either tried some shady route or page is under the development.
          </Typography>
          <Button
            onClick={() => navigate(-1)}
            startIcon={
              <SvgIcon fontSize="small">{/* <ArrowLeftIcon /> */}</SvgIcon>
            }
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back
          </Button>
        </Box>
      </Container>
    </Box>
  );
});
