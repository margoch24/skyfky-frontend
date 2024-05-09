import { Box, SxProps, Typography } from "@mui/material";
import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { DarkColor } from "shared/constants/colors";
import { SubtitleFont } from "shared/constants/fonts";

interface CustomLinkProps {
  path: string;
  targetBlank?: boolean;
  title: string;
  color?: string;
  font?: string;
  sx?: SxProps;
}

export const CustomLink: FC<CustomLinkProps> = memo(
  ({ path, targetBlank, title, color, font, sx = {} }) => {
    return (
      <Box sx={sx}>
        <Link
          style={{ textDecoration: "none" }}
          to={path}
          target={targetBlank ? "_blank" : "_self"}
          color="inherit"
        >
          <Typography
            sx={{
              fontFamily: font || SubtitleFont,
              color: color || DarkColor,
              fontSize: "18px",
            }}
            variant="inherit"
          >
            {title}
          </Typography>
        </Link>
      </Box>
    );
  }
);
