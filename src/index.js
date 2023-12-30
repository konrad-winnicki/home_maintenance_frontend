import React, { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider, AuthorizationContext } from "./contexts/authorizationContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { WrappedProductsCard } from "./components/productsCard/ProductsCard";
import { WrappedShoppingItemsCard } from "./components/shoppingItemsCard/ShoppingItemsCard";
import HomesCard from "./components/homes/HomesCard";
import { HomeContextProvider } from "./contexts/homeContext";
import { SocketContextProvider } from "./contexts/socketContext";
import { AppContextProvider } from "./contexts/appContext";
import { LoginComponent } from "./components/LoginComponent";
import NavigationBar from "./components/commonComponents/NavigationBar";
import { ToastContainer } from "react-toastify";

export const AppRoutes = () => {

  const authorizationContext = useContext(AuthorizationContext)
    return(
  
  <div className="container vh-100 vw-100 d-flex flex-column" 
   >
  {authorizationContext.isLoggedIn? <NavigationBar />: ""}
  {authorizationContext.isLoggedIn? <ToastContainer />: ""}

  
  <Routes>
    <Route path="/" element={<LoginComponent />} />
    <Route path="/login" element={<LoginComponent />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/products/" element={<WrappedProductsCard />} />
      <Route path="/shoppingItems/" element={<WrappedShoppingItemsCard />} />
      <Route path="/homes" element={<HomesCard />} />
    </Route>
  </Routes>
  </div>)
};

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
