import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedAuth = ({ allowedRoles, routeProtected = true }) => {
  const { user } = useAuth();
  console.log("🚀 ~ file: ProtectedAuth.js:6 ~ ProtectedAuth ~ user", user)
  const location = useLocation();

  if (!routeProtected) {
    return !user ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }

  if (user) {
    return <Outlet />;
  } else if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

};

export default ProtectedAuth;
