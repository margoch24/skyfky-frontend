import { Box, Button } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import AuthBg from "/assets/authenticate/auth_bg.png";
import { AccountPanelPages, AdminAccountPanelPages } from "./constants";
import { TitleFont } from "shared/constants/fonts";
import { DarkBlue } from "shared/constants/colors";
import { useNavigate } from "react-router-dom";
import { PagePath } from "shared/constants";
import { useUserContext } from "common/hooks/userContext";

interface PanelProps {
  pageKey?: string;
}

export const Panel: FC<PanelProps> = memo(({ pageKey }) => {
  const navigate = useNavigate();
  const { isAdmin } = useUserContext();
  const PanelPages = isAdmin ? AdminAccountPanelPages : AccountPanelPages;

  const defaultPage = PanelPages.find((page) =>
    pageKey ? page.key === pageKey : page?.default
  );
  const [currentPageKey, setCurrentPageKey] = useState<string | undefined>(
    defaultPage?.key
  );
  const [Element, setElement] = useState<FC | undefined>(defaultPage?.element);

  const handleClick = (key: string) => {
    setCurrentPageKey(key);
    navigate(`${PagePath.Account}?pageKey=${key}`);
  };

  useEffect(() => {
    const currentPage = PanelPages.find((page) => page?.key === currentPageKey);
    setElement(currentPage?.element);
  }, [currentPageKey, PanelPages]);

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
          width: "300px",
          backgroundImage: `url(${AuthBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "10rem",
        }}
      >
        {PanelPages.map(({ key, title }) => (
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
