import { FC, memo } from "react";

import { Container, Typography } from "@mui/material";
import { TitleFont } from "shared/constants/fonts";
import { DarkColor } from "shared/constants/colors";
import { CustomButton } from "components/wrappers/CustomButton";
import { ButtonTheme, PagePath } from "shared/constants";
import { useUserContext } from "common/hooks/userContext";
import { useNavigate } from "react-router-dom";

export const Reviews: FC = memo(() => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(user ? PagePath.CreateReview : PagePath.Login);
  };
  return (
    <>
      <Container
        sx={{
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: DarkColor,
            fontFamily: TitleFont,
            fontSize: "30px",
            textAlign: "left",
          }}
        >
          Opinions <b>matter</b>
        </Typography>

        <CustomButton
          onClick={handleClick}
          title="Share your opinion"
          theme={ButtonTheme.Transparent}
        />
      </Container>
    </>
  );
});
