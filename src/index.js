import React, { StrictMode } from "react"; // TODO: enable StrictMode
import { createRoot } from "react-dom/client";
import "./index.css";
import WrappedLoginComponent from "./components/LoginComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authorizationContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { WrappedProductsCard } from "./components/productsCard/ProductsCard";
import { WrappedShoppingItemsCard } from "./components/shoppingItemsCard/ShoppingItemsCard";
import HomesCard from "./components/homes/HomesCard";
import { HomeContextProvider } from "./contexts/homeContext";
import { SocketContextProvider } from "./contexts/socketContext";
import { AppContextProvider } from "./contexts/appContext";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<WrappedLoginComponent />} />
    <Route path="/login" element={<WrappedLoginComponent />} />
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
