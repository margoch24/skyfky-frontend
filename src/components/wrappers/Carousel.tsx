import { Box, Button } from "@mui/material";
import { FC, ReactNode, memo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { DarkColor } from "shared/constants/colors";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1300, min: 1024 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 1024, min: 0 },
    items: 1,
  },
};

export const Carousel: FC<{
  children: ReactNode;
}> = memo(({ children }) => {
  const CustomArrow = ({
    onClick,
    arrowType,
  }: {
    onClick?: () => void;
    arrowType: string;
  }) => {
    if (!onClick) return;
    const Arrow = arrowType === "left" ? IoIosArrowBack : IoIosArrowForward;
    return (
      <Button
        sx={{
          position: "absolute",
          cursor: "pointer",
          ...(arrowType === "right" && { right: 0 }),
        }}
      >
        <Arrow size={20} color={DarkColor} onClick={() => onClick()} />
      </Button>
    );
  };

  return (
    <Box
      sx={{
        "& .react-multi-carousel-track": {
          alignItems: "center",
          padding: "10px",
        },
      }}
    >
      <MultiCarousel
        customRightArrow={<CustomArrow arrowType="right" />}
        customLeftArrow={<CustomArrow arrowType="left" />}
        responsive={responsive}
      >
        {children}
      </MultiCarousel>
    </Box>
  );
});

Carousel.displayName = "Carousel";
