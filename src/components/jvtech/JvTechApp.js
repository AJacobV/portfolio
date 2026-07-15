import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./JvTech.css";
import { JvTechProvider, useJvTech } from "./JvTechContext";

// Layouts
import JvTechAdminLayout from "./layouts/JvTechAdminLayout";
import JvTechCustomerLayout from "./layouts/JvTechCustomerLayout";

// Auth Pages
import JvTechLogin from "./auth/JvTechLogin";
import JvTechCustomerRegister from "./auth/JvTechCustomerRegister";

// Admin/Employee Pages
import JvTechDashboard from "./pages/JvTechDashboard";
import JvTechShop from "./pages/JvTechShop";
import JvTechProducts from "./pages/JvTechProducts";
import JvTechCustomers from "./pages/JvTechCustomers";
import JvTechTransactions from "./pages/JvTechTransactions";
import JvTechSales from "./pages/JvTechSales";
import JvTechLogs from "./pages/JvTechLogs";
import JvTechUsers from "./pages/JvTechUsers";
import JvTechProfile from "./pages/JvTechProfile";

// Customer Pages
import JvTechCustomerPortal from "./pages/JvTechCustomerPortal";

// --- Route Guards ---

const AdminRoute = ({ children, title }) => {
  const { currentUser } = useJvTech();
  const location = useLocation();

  if (!currentUser)
    return <Navigate to="/jvtech/login" state={{ from: location }} replace />;
  if (currentUser.portal !== "admin")
    return <Navigate to="/jvtech/customer-portal" replace />;

  return <JvTechAdminLayout pageTitle={title}>{children}</JvTechAdminLayout>;
};

const CustomerRoute = ({ children }) => {
  const { currentUser } = useJvTech();
  const location = useLocation();

  if (!currentUser)
    return <Navigate to="/jvtech/login" state={{ from: location }} replace />;
  if (currentUser.portal !== "customer")
    return <Navigate to="/jvtech/dashboard" replace />;

  return <JvTechCustomerLayout>{children}</JvTechCustomerLayout>;
};

const PublicRoute = ({ children }) => {
  const { currentUser } = useJvTech();
  if (currentUser) {
    return (
      <Navigate
        to={
          currentUser.portal === "admin"
            ? "/jvtech/dashboard"
            : "/jvtech/customer-portal"
        }
        replace
      />
    );
  }
  return children;
};

// --- Main App Component ---

const JvTechRouter = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/jvtech/login" replace />} />

      {/* Auth */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <JvTechLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <JvTechCustomerRegister />
          </PublicRoute>
        }
      />

      {/* Admin/Employee Routes */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute title="Dashboard">
            <JvTechDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/shop"
        element={
          <AdminRoute title="Point of Sale">
            <JvTechShop />
          </AdminRoute>
        }
      />
      <Route
        path="/products"
        element={
          <AdminRoute title="Inventory">
            <JvTechProducts />
          </AdminRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <AdminRoute title="Customers">
            <JvTechCustomers />
          </AdminRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <AdminRoute title="Transactions">
            <JvTechTransactions />
          </AdminRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <AdminRoute title="Sales History">
            <JvTechSales />
          </AdminRoute>
        }
      />
      <Route
        path="/logs"
        element={
          <AdminRoute title="System Logs">
            <JvTechLogs />
          </AdminRoute>
        }
      />
      <Route
        path="/users"
        element={
          <AdminRoute title="User Management">
            <JvTechUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AdminRoute title="My Profile">
            <JvTechProfile />
          </AdminRoute>
        }
      />

      {/* Customer Routes */}
      <Route
        path="/customer-portal"
        element={
          <CustomerRoute>
            <JvTechCustomerPortal />
          </CustomerRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/jvtech/login" replace />} />
    </Routes>
  );
};

export default function JvTechApp() {
  return (
    <JvTechProvider>
      <JvTechRouter />
    </JvTechProvider>
  );
}
