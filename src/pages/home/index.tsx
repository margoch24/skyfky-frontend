import { FC, memo } from "react";
import { Landing } from "./Landing";
import { Layout } from "components/layout/Layout";
import { Statistics } from "./Statistics";
import { PopularFlights } from "./PopularFlights";
import { Reviews } from "./Reviews";
import { Divider } from "components/wrappers/Divider";

export const HomePage: FC = memo(() => {
  return (
    <>
      <Layout>
        <Landing />
        <PopularFlights />
        <Statistics />
        <Reviews />
        <Divider />
      </Layout>
    </>
  );
});
