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
import DebtReminder from "./pages/Customer/DebtReminder/DebtReminder";
import {
  Admin,
  Customer,
  Employee
} from "./constant/roles";

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route element={<ProtectedAuth routeProtected={false} />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/password-change" element={<PasswordChange />} />

      <Route element={<ProtectedAuth allowedRoles={[...Customer]} />} >
        <Route path="/" element={<CustomerLayout> <HomePage /> </CustomerLayout>}>

        </Route>
      </Route>

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
            <TransferPage isInternalTransfer={true} />
          </CustomerLayout>
        }
      />
      <Route
        path="/quicktransfer"
        element={
          <CustomerLayout>
            <TransferPage isInternalTransfer={false} />
          </CustomerLayout>
        }
      />

      {/* Debt Reminder */}
      <Route path="debt-reminder" element={
        <DebtReminder />
      } />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
