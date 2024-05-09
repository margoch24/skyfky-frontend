import { FC, memo } from "react";
import { Layout } from "components/layout/Layout";
import { Box } from "@mui/material";
import { Panel } from "./Panel";

export const AccountPage: FC = memo(() => {
  return (
    <Layout>
      <Box
        sx={{
          height: "87px",
          backgroundColor: "#2C5D81",
        }}
      ></Box>
      <Panel />
    </Layout>
  );
});
