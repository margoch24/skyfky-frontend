import { FC, memo, useEffect, useRef } from "react";
import { Landing } from "./Landing";
import { Layout } from "components/layout/Layout";
import { Statistics } from "./Statistics";
import { PopularFlights } from "./PopularFlights";
import { Reviews } from "./Reviews";
import { Divider } from "components/wrappers/Divider";

export const HomePage: FC = memo(() => {
  const isPageLoaded = useRef(false);

  useEffect(() => {
    if (!isPageLoaded.current) {
      window.scrollTo(0, 0);
    }

    isPageLoaded.current = true;
  });
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
