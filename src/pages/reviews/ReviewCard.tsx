import { FC, memo } from "react";
import { Box, Rating, SxProps, Typography } from "@mui/material";

import { ReviewType } from "./constants";
import { DarkColor, SubtitleColor } from "shared/constants/colors";
import { SubtitleFont } from "shared/constants/fonts";
import { getImageHelper } from "common/helpers/getImage";
import DefaultProfilePhoto from "/assets/default_profile_photo.jpeg";

export const ReviewCard: FC<{
  sx?: SxProps;
  review: ReviewType;
}> = memo(({ sx, review: { user, message, rating } }) => {
  return (
    <Box
      sx={{
        width: "350px",
        height: "400px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
        position: "relative",
        ...sx,
      }}
    >
      <img
        style={{
          position: "absolute",
          left: "20px",
          top: "20px",
          borderRadius: "50%",
        }}
        height="140px"
        width="140px"
        src={user?.photo ? getImageHelper(user?.photo) : DefaultProfilePhoto}
      />
      <Box
        sx={{
          height: "25%",
          borderBottom: "100px solid transparent",
          borderLeft: `350px solid rgba(111, 130, 170, 0.8)`,
        }}
      ></Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "50%",
          padding: "0 20px",
        }}
      >
        <Typography
          sx={{
            fontFamily: SubtitleFont,
            fontSize: "25px",
            color: DarkColor,
            textAlign: "right",
            marginTop: "-4rem",
          }}
        >
          {user.name}
        </Typography>

        <Typography
          sx={{
            fontFamily: SubtitleFont,
            fontSize: "16px",
            color: SubtitleColor,
            wordWrap: "break-word",
            overflow: "auto",
            maxHeight: "150px",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {message}
        </Typography>
        <Rating
          sx={{
            margin: "0 auto",
          }}
          readOnly={true}
          value={rating}
        />
      </Box>
    </Box>
  );
});
