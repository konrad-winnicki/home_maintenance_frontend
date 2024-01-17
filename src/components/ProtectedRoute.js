import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthorizationContext } from "../contexts/authorizationContext";
import NavigationBar from "./commonComponents/NavigationBar";
import { ToastContainer } from "react-toastify";
export const Protected = () => {
  const authContext = useContext(AuthorizationContext);
  if (!authContext.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavigationBar />
      <ToastContainer />
      <Outlet />
    </>
  );
};
