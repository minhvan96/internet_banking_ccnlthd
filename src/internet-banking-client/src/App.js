import { Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import ProtectedAuth from "./components/ProtectedAuth";
import Login from "./components/Login";
import Error from "./components/Error";
import PasswordReset from "./components/PasswordReset";
import HomePage from "./pages/Customer/Home/HomePage";
import CustomerLayout from "./layouts/customer";
import './app.scss';

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route element={<ProtectedAuth routeProtected={false} />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/password_reset" element={<PasswordReset />} />
      <Route
        path="/"
        element={
          <CustomerLayout>
            <HomePage />
          </CustomerLayout>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
