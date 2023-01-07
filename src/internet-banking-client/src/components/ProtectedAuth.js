import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedAuth = ({ routeProtected = true }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!routeProtected) {
    console.log("🚀 ~ file: ProtectedAuth.js:10 ~ ProtectedAuth ~ routeProtected", routeProtected)
    return !user ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }

  // if (user) {
  //   return <Outlet />;
  // } else if (user) {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // } else {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  if (user) {
    if (user.roles[0].name === 'Customer') {
      return <Outlet />;
    } else if (user.roles[0].name === 'Customer') {
      return <Navigate to="/" state={{ from: location }} replace />;
    } else if(user.roles[0].name === 'Administrator' || user.roles[0].name === 'Employee') {
      return <Navigate to="/admin" state={{ from: location }} replace />;
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

};

export default ProtectedAuth;
