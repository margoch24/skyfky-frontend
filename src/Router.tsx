import { FC, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PagePath, UserRole } from "shared/constants";

import { Page404 } from "pages/error-pages/Page404";
import { HomePage } from "pages/home";
import { LoginPage } from "pages/authenticate/LoginPage";
import { RegisterPage } from "pages/authenticate/RegisterPage";
import { AccountPage } from "pages/account";
import { CreateFlightPage } from "pages/flights/CreateFlightPage";
import { FlightPage } from "pages/flights/FlightPage";
import { CreateTicketPage } from "pages/tickets/CreateTicketPage";
import { FlightsPage } from "pages/flights/flightsPage/FlightsPage";
import { CreateReviewPage } from "pages/reviews/CreateReviewPage";
import { CheckTicketPage } from "pages/tickets/CheckTicketPage";
import { RequireAuth } from "components/wrappers/RequireAuth";

export const Router: FC = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PagePath.All} element={<Page404 />} />
        <Route path={PagePath.Home} element={<HomePage />} />
        <Route path={PagePath.Login} element={<LoginPage />} />
        <Route path={PagePath.Register} element={<RegisterPage />} />

        <Route element={<RequireAuth role={UserRole.User} />}>
          <Route path={PagePath.Account} element={<AccountPage />} />
          <Route path={PagePath.CreateReview} element={<CreateReviewPage />} />
          <Route path={PagePath.CreateTicket} element={<CreateTicketPage />} />
        </Route>

        <Route element={<RequireAuth role={UserRole.Admin} />}>
          <Route path={PagePath.CreateFlight} element={<CreateFlightPage />} />
          <Route path={PagePath.CheckTicket} element={<CheckTicketPage />} />
        </Route>

        <Route path={PagePath.Flight} element={<FlightPage />} />

        <Route path={PagePath.Flights} element={<FlightsPage />} />
      </Routes>
    </BrowserRouter>
  );
});

Router.displayName = "Router";
