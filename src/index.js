import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authorizationContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { WrappedProductsCard } from "./components/productsCard/ProductsCard";
import { WrappedShoppingItemsCard } from "./components/shoppingItemsCard/ShoppingItemsCard";
import HomesCard from "./components/homes/HomesCard";
import { HomeContextProvider } from "./contexts/homeContext";
import { SocketContextProvider } from "./contexts/socketContext";
import { AppContextProvider } from "./contexts/appContext";
import { LoginComponent } from "./components/LoginComponent";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginComponent />} />
    <Route path="/login" element={<LoginComponent />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/products/" element={<WrappedProductsCard />} />
      <Route path="/shoppingItems/" element={<WrappedShoppingItemsCard />} />
      <Route path="/homes" element={<HomesCard />} />
    </Route>
  </Routes>
);

const container = document.getElementById("root");
const productsComponent = createRoot(container);
productsComponent.render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <AppContextProvider>
      <SocketContextProvider>
          <HomeContextProvider>
            <AppRoutes />
          </HomeContextProvider>
        </SocketContextProvider>
        </AppContextProvider>
    </AuthContextProvider>
    </Router>
  </StrictMode>
);
