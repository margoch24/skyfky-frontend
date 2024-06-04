import { Box } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { AccountPanelPages, AdminAccountPanelPages } from "./constants";
import { useNavigate } from "react-router-dom";
import { PagePath } from "shared/constants";
import { useUserContext } from "common/hooks/userContext";
import { PanelDesktop } from "./PanelDesktop";
import { PanelMobile } from "./PanelMobile";

interface PanelProps {
  pageKey?: string;
}

export const Panel: FC<PanelProps> = memo(({ pageKey }) => {
  const navigate = useNavigate();
  const { isAdmin } = useUserContext();
  const PanelPages = isAdmin ? AdminAccountPanelPages : AccountPanelPages;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showPanel, setShowPanel] = useState<boolean>(false);

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

  const handleShowMenuClick = () => {
    setShowMenu(!showMenu);

    if (showPanel) {
      setShowPanel(!showPanel);
      return;
    }
    setTimeout(() => {
      setShowPanel(!showPanel);
    }, 200);
  };

  const handlePanelButtonClick = (key: string) => {
    handleClick(key);
    setShowMenu(false);
    setShowPanel(false);
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
        overflow: "hidden",
      }}
    >
      <PanelDesktop
        currentPageKey={currentPageKey}
        PanelPages={PanelPages}
        handleClick={handleClick}
      />

      <PanelMobile
        currentPageKey={currentPageKey}
        PanelPages={PanelPages}
        handleClick={handleClick}
        handlePanelButtonClick={handlePanelButtonClick}
        handleShowMenuClick={handleShowMenuClick}
        showMenu={showMenu}
        showPanel={showPanel}
      />

      <Box
        sx={{
          width: "100%",
          paddingTop: "10rem",
          paddingBottom: {
            sm: 0,
            xs: "5rem",
          },
        }}
        onClick={showMenu ? handleShowMenuClick : () => {}}
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
