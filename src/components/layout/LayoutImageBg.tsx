import { Stack, SxProps } from "@mui/material";
import { FC, ReactNode, memo } from "react";

interface LayoutImageBgProps {
  children: ReactNode;
  bgImage: string;
  sx?: SxProps;
}

export const LayoutImageBg: FC<LayoutImageBgProps> = memo(
  ({ children, bgImage, sx }) => (
    <Stack
      sx={{
        backgroundImage: `url(${bgImage})`,

        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        ...sx,
      }}
    >
      {children}
    </Stack>
  )
);
