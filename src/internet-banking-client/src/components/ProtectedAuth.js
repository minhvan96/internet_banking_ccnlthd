import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedAuth = ({ allowedRoles, routeProtected = true }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!routeProtected) {
    return !user ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }

  if (allowedRoles.includes(user?.roles[0].name)) {
    return <Outlet />;
  } else if (user?.roles[0].name && !allowedRoles.includes(user?.roles[0].name)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

};

export default ProtectedAuth;
