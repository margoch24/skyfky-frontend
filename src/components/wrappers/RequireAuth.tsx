import { useUserContext } from "common/hooks/userContext";
import { FC, memo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PagePath, UserRole } from "shared/constants";

interface RequireAuthProps {
  role?: string;
}

export const RequireAuth: FC<RequireAuthProps> = memo(({ role }) => {
  const { user, isAdmin } = useUserContext();
  const location = useLocation();

  return user ? (
    role === UserRole.Admin && !isAdmin ? (
      <Navigate to={PagePath.Page404} />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={PagePath.Login} state={{ from: location }} replace />
  );
});
