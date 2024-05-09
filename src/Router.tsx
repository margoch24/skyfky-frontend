import { FC, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PagePath } from "shared/constants";

import { Page404 } from "pages/error-pages/Page404";
import { HomePage } from "pages/home";
import { LoginPage } from "pages/authenticate/LoginPage";
import { RegisterPage } from "pages/authenticate/RegisterPage";
import { useUserContext } from "common/hooks/userContext";
import { AccountPage } from "pages/account";
import { CreateFlightPage } from "pages/flights/CreateFlightPage";

export const Router: FC = memo(() => {
  const { user, isAdmin } = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PagePath.All} element={<Page404 />} />
        <Route path={PagePath.Home} element={<HomePage />} />
        <Route path={PagePath.Login} element={<LoginPage />} />
        <Route path={PagePath.Register} element={<RegisterPage />} />
        {user && <Route path={PagePath.Account} element={<AccountPage />} />}
        {user && isAdmin && (
          <Route path={PagePath.CreateFlight} element={<CreateFlightPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
});

Router.displayName = "Router";
