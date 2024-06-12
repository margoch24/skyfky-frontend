import { FC, memo, useEffect, useRef } from "react";
import { Layout } from "components/layout/Layout";
import { Box } from "@mui/material";
import { Panel } from "./Panel";
import { useCustomUrlQuery } from "common/helpers/query";

export const AccountPage: FC = memo(() => {
  const { pageKey }: { pageKey?: string } = useCustomUrlQuery(
    window.location.search
  );
  const isPageLoaded = useRef(false);

  useEffect(() => {
    if (!isPageLoaded.current) {
      window.scrollTo(0, 0);
    }

    isPageLoaded.current = true;
  });

  return (
    <Layout>
      <Box
        sx={{
          height: "87px",
          backgroundColor: "#2C5D81",
        }}
      ></Box>
      <Panel pageKey={pageKey} />
    </Layout>
  );
});
