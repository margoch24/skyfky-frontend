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
import { ContactUsPage } from "pages/contact_us/ContactUsPage";
import { PrivacyPolicyPage } from "pages/privacy_policy/PrivacyPolicyPage";
import { TermsConditionsPage } from "pages/terms_conditions/TermsConditionsPage";
import { AboutPage } from "pages/about/AboutPage";

export const Router: FC = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PagePath.All} element={<Page404 />} />
        <Route path={PagePath.Home} element={<HomePage />} />
        <Route path={PagePath.Login} element={<LoginPage />} />
        <Route path={PagePath.Register} element={<RegisterPage />} />
        <Route path={PagePath.Flight} element={<FlightPage />} />
        <Route path={PagePath.Flights} element={<FlightsPage />} />
        <Route path={PagePath.ContactUs} element={<ContactUsPage />} />
        <Route path={PagePath.PrivacyPolicy} element={<PrivacyPolicyPage />} />
        <Route
          path={PagePath.TermsConditions}
          element={<TermsConditionsPage />}
        />
        <Route path={PagePath.About} element={<AboutPage />} />

        <Route element={<RequireAuth role={UserRole.User} />}>
          <Route path={PagePath.Account} element={<AccountPage />} />
          <Route path={PagePath.CreateReview} element={<CreateReviewPage />} />
          <Route path={PagePath.CreateTicket} element={<CreateTicketPage />} />
        </Route>

        <Route element={<RequireAuth role={UserRole.Admin} />}>
          <Route path={PagePath.CreateFlight} element={<CreateFlightPage />} />
          <Route path={PagePath.CheckTicket} element={<CheckTicketPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

Router.displayName = "Router";
