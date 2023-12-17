import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import { ToastContainer } from "react-toastify";
import NavigationBar from "../commonComponents/NavigationBar";
import HomeList from "./HomeList";

export default function Homes() {
  const appContext = useContext(AppContext);
  return (
    <>
      {/* TODO: create a reusable frame component with common navigation, toast
      etc. */}
      <NavigationBar />
      <ToastContainer />
      <div
        className="flex-grow-1 mt-5 mb-8"
        style={{
          overflow: "auto",
          paddingBottom: "1%",
          marginBottom: "14%",
        }}
      >
        <div className="container vh-100 vw-100 d-flex flex-column">
          <div className="header">Your homes</div>
          {/* TODO: here is the place for the current "page" */}
          <HomeList />
        </div>
      </div>
    </>
  );
}
