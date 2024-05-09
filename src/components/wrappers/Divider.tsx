import { Box } from "@mui/material";
import { FC, memo } from "react";
import { MainColor } from "shared/constants/colors";

export const Divider: FC = memo(() => {
  return (
    <Box
      sx={{
        height: "38px",
        width: "100%",
        background: `linear-gradient(45deg, #EAAFB1 30%, ${MainColor} 90%)`,
      }}
    ></Box>
  );
});
