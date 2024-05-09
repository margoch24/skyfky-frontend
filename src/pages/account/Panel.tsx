import { Box, Button } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import AuthBg from "/assets/authenticate/auth_bg.png";
import { AccountPanelPages } from "./constants";
import { TitleFont } from "shared/constants/fonts";
import { DarkBlue } from "shared/constants/colors";

export const Panel: FC = memo(() => {
  const defaultPage = AccountPanelPages.find((page) => page?.default);
  const [currentPageKey, setCurrentPageKey] = useState<string | undefined>(
    defaultPage?.key
  );
  const [Element, setElement] = useState<FC | undefined>(defaultPage?.element);

  const handleClick = (key: string) => {
    setCurrentPageKey(key);
  };

  useEffect(() => {
    const currentPage = AccountPanelPages.find(
      (page) => page?.key === currentPageKey
    );
    setElement(currentPage?.element);
  }, [currentPageKey]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: "300px",
          backgroundImage: `url(${AuthBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "10rem",
        }}
      >
        {AccountPanelPages.map(({ key, title }) => (
          <Button
            onClick={() => handleClick(key)}
            key={key}
            sx={{
              paddingTop: "15px",
              paddingLeft: "30px",
              width: "100%",
              borderRadius: 0,
              backgroundColor: currentPageKey === key ? "white" : "transparent",
              fontFamily: TitleFont,
              fontSize: "25px",
              color: currentPageKey === key ? DarkBlue : "white",
              textTransform: "none",
              justifyContent: "left",
              ...(currentPageKey === key && {
                "&:hover": {
                  backgroundColor: "white",
                },
              }),
            }}
          >
            {title}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          width: "100%",
          paddingTop: "10rem",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            margin: "auto",
          }}
        >
          {Element && <Element />}
        </Box>
      </Box>
    </Box>
  );
});
