import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {Admin, Employee} from "../constant/roles";

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
    console.log("if1")
    console.log(user)
    return <Outlet />;
  } else if (user) {
    if(user.roles.name == Admin){
      console.log("if12")
      console.log(user)
      return <Navigate to="/admin-page" state={{ from: location }} replace />;
    }else if(user.roles.name == Employee){

    }else{
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

};

export default ProtectedAuth;
