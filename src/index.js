import React, { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AuthContextProvider,
  AuthorizationContext,
} from "./contexts/authorizationContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { WrappedProductsCard } from "./components/productsCard/ProductsCard";
import { ShoppingItemsCard } from "./components/shoppingItemsCard/ShoppingItemsCard";
import HomesCard from "./components/homes/HomesCard";
import { HomeContextProvider } from "./contexts/homeContext";
import { AppContextProvider } from "./contexts/appContext";
import { LoginComponent } from "./components/LoginComponent";
import NavigationBar from "./components/commonComponents/NavigationBar";
import { ToastContainer } from "react-toastify";

export const AppRoutes = () => {
  const authorizationContext = useContext(AuthorizationContext);
  return (
    <div
      className="container vh-100 vw-100 px-0 d-flex flex-column"
      style={{ backgroundColor: "#fafaf9" }}
    >
      {authorizationContext.isLoggedIn && (
        <>
          <NavigationBar />
          <ToastContainer />
        </>
      )}

      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products/" element={<WrappedProductsCard />} />
          <Route path="/shoppingItems/" element={<ShoppingItemsCard />} />
          <Route path="/homes" element={<HomesCard />} />
        </Route>
      </Routes>
    </div>
  );
};

const container = document.getElementById("root");
const productsComponent = createRoot(container);
productsComponent.render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <AppContextProvider>
            <HomeContextProvider>
              <AppRoutes />
            </HomeContextProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </Router>
  </StrictMode>
);
