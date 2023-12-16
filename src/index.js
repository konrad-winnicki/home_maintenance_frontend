import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import  {
  WrappedLoginComponent,
} from "./components/LoginComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authorizationContext";
import { WrappedDashboardComponent } from "./components/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import StoreProducts from "./components/StoreProducts";
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<WrappedLoginComponent />} />
    <Route path="/login" element={<WrappedLoginComponent />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<WrappedDashboardComponent />} />
      <Route path="/products/" element={<StoreProducts />} />

    </Route>
  </Routes>
);

const container = document.getElementById("root");
const productsComponent = createRoot(container);
productsComponent.render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </Router>
  </StrictMode>
);
