import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import { SupportPage } from "./pages/support/Support";
import { DashboardPage } from "./pages/dashboard/Dashboard";
import { PaymentPage } from "./pages/payment/Payment";
import { Layout } from "./components/Layout/Layout";
import { TransactionsPage } from "./pages/transaction/Transaction";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AuthPage } from "./pages/auth/auth";
import { ForgotPasswordPage } from "./pages/auth/forgotPassword";
import { ReduxToast } from "./components/ui/toast";

function AppRoutes() {
  return (
    <div className="min-h-screen bg-black">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<AuthPage />} />

          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<Layout protectedPage />}>
          <Route path="payment" element={<PaymentPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transaction" element={<TransactionsPage />} />
          {/*Future Grouped Pages  */}
          {/* <Route path="admin/*" element={<AdminPage />} />
          <Route path="user/*" element={<UserPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
      <ReduxToast />
    </Router>
  );
}

export default App;
