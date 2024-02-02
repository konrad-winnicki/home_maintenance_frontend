import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthorizationContext } from "../contexts/authorizationContext";
import NavigationBar from "./commonComponents/NavigationBar";
import { ToastContainer } from "react-toastify";
import { CreateBarcodeItem } from "./commonComponents/CreateBarcodeItemPrompt";
import { AppContext } from "../contexts/appContext";
import { APP_STATES } from "../applicationStates";
import { CreateProductPrompt } from "./commonComponents/CreateProductPrompt";
export const Protected = () => {
  const authContext = useContext(AuthorizationContext);
  const appContext = useContext(AppContext);
  if (!authContext.isLoggedIn) {
    return <Navigate to="/" />;
  }

  const showProductPrompt = <CreateProductPrompt></CreateProductPrompt>;
  const showBarcodePrompt = <CreateBarcodeItem></CreateBarcodeItem>;

  const whichPrompt = () => {
    if (appContext.showPrompt === "PRODUCT") {
      return showProductPrompt;
    }
    if (appContext.showPrompt === "BARCODE") {
      return showBarcodePrompt;
    }
  };

  return (
    <>
      <NavigationBar />

      <ToastContainer />
      {appContext.showPrompt ? whichPrompt() : ""}
      <Outlet />
    </>
  );
};
