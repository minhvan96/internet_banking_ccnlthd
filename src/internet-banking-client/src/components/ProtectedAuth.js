import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedAuth = ({ allowedRoles, routeProtected = true }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  console.log("🚀 ~ file: ProtectedAuth.js:6 ~ ProtectedAuth ~ user", user)
  if (!routeProtected) {
    return !user ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }

  if (allowedRoles.includes(user?.user?.role)) {
    return <Outlet />;
  } else if (user?.user?.role && !allowedRoles.includes(user?.user?.role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

};

export default ProtectedAuth;
