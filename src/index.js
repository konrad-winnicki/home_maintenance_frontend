import React, { StrictMode} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AuthContextProvider,
} from "./contexts/authorizationContext";
import { Protected } from "./components/ProtectedRoute";
import { WrappedProductsCard } from "./components/productsCard/ProductsCard";
import { ShoppingItemsCard } from "./components/shoppingItemsCard/ShoppingItemsCard";
import HomesCard from "./components/homes/HomesCard";
import { HomeContextProvider } from "./contexts/homeContext";
import { AppContextProvider } from "./contexts/appContext";
import { LoginComponent } from "./components/LoginComponent";
import { DeletedAccountCard } from "./components/users/DeleteAccountCard";
export const AppRoutes = () => {
  return (
    <div
      className="container vh-100 vw-100 px-0 d-flex flex-column"
      style={{ backgroundColor: "#fafaf9" }}
    >
      
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/accountDeleted" element={<DeletedAccountCard />} />

        <Route element={<Protected />}>
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
  //<StrictMode>
    <Router>
      <AuthContextProvider>
        <AppContextProvider>
          <HomeContextProvider>
            <AppRoutes />
          </HomeContextProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </Router>
  //</StrictMode>
);
