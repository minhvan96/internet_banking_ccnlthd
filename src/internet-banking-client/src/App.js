import { Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import ProtectedAuth from "./components/ProtectedAuth";
import Login from "./components/Login";
import Error from "./components/Error";
import PasswordReset from "./components/PasswordReset";
import HomePage from "./pages/Customer/Home/HomePage";
import CustomerLayout from "./layouts/customer";
import PasswordChange from "./components/PasswordChange";
import "./app.scss";
import Beneficiary from "./pages/Customer/Beneficiary/Beneficiary";
import TransferPage from "./pages/Customer/Transfer/TransferPage";

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route element={<ProtectedAuth routeProtected={false} />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/password-change" element={<PasswordChange />} />
      <Route
        path="/beneficiary"
        element={
          <CustomerLayout>
            <Beneficiary />
          </CustomerLayout>
        }
      />
      <Route
        path="/internaltransfer"
        element={
          <CustomerLayout>
            <TransferPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/quicktransfer"
        element={
          <CustomerLayout>
            <TransferPage isInternalTransfer={true}/>
          </CustomerLayout>
        }
      />
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
