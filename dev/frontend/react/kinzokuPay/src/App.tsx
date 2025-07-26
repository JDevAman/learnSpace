import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import { SupportPage } from "./pages/support/Support";
import { DashboardPage } from "./pages/dashboard/Dashboard";
import { PaymentPage } from "./pages/payment/Payment";
import { Layout } from "./components/Layout/Layout";
import { TransactionsPage } from "./pages/transaction/Transaction";

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<SupportPage />} />
        <Route
          path="/dashboard"
          element={
            <Layout protectedPage>
              <DashboardPage
                onNavigate={(route) => navigate(`/${route}`)}
                onLogout={() => navigate("/")}
              />
            </Layout>
          }
        />
        <Route
          path="/payment"
          element={
            <Layout protectedPage>
              <PaymentPage
                onNavigate={(route) => navigate(`/${route}`)}
                onLogout={() => navigate("/")}
              />
            </Layout>
          }
        />
        <Route
          path="/transaction"
          element={
            <Layout protectedPage>
              <TransactionsPage
                onNavigate={(route) => navigate(`/${route}`)}
                onLogout={() => navigate("/")}
              />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <div className="text-white text-center p-10">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
