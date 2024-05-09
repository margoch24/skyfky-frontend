import { Stack } from "@mui/material";
import { FC, ReactNode, memo } from "react";

interface LayoutImageBgProps {
  children: ReactNode;
  bgImage: string;
  height: string;
  minHeight?: boolean;
}

export const LayoutImageBg: FC<LayoutImageBgProps> = memo(
  ({ children, bgImage, height, minHeight = false }) => (
    <Stack
      sx={{
        backgroundImage: `url(${bgImage})`,
        ...(minHeight
          ? { minHeight: height, justifyContent: "center" }
          : { height }),
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </Stack>
  )
);
