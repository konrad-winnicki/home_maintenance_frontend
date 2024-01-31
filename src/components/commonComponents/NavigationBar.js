import React, { useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { ImListNumbered } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../../contexts/homeContext";
import "./NavigationBarButtons.css";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DeleteAccountButton from "../users/DeleteAccountButton";
import { logOut } from "../../services/loginAuxilaryFunctions";
const NavigationBar = () => {
  const homeContext = useContext(HomeContext);
  const appContext = useContext(AppContext);
  const home = homeContext.home;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("nav", appContext.appState);
  });
  const brightness =
    appContext.appState === APP_STATES.SHOW_PROMPT ? "brightness(0.8)" : "";

  return (
    <React.Fragment>
      <nav
        className="navbar sticky-top"
        style={{ filter: `${brightness}`, backgroundColor: "#f6bd60" }}
      >
        <div className="col-md-1 mx-3 my-2" style={{ alignItems: "center" }}>
          <DropdownButton
            style={{ alignItems: "center" }}
            disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
            id="navbar_buttons"
            title={<IoSettingsSharp />}
          >
            <div className="col text-left" style={{ marginLeft: "15px" }}>
              Account
            </div>
            <Dropdown.Divider />

            <Dropdown.Item>
              {" "}
              <DeleteAccountButton></DeleteAccountButton>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item>
              {" "}
              <div
                className="col text-left"
                style={{ marginLeft: "15px" }}
                onClick={() => logOut()}
              >
                LogOut
              </div>
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="col-md-1 mx-1 my-1 text-end">
          <button
            className="navbar_buttons"
            disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
            onClick={() => {
              navigate("/homes");
            }}
          >
            <IoHome />
          </button>
        </div>
        <div className="col-md-1 mx-1 my-1 text-end">
          <button
            className="navbar_buttons"
            disabled={
              !home || appContext.appState !== APP_STATES.DEFAULT ? true : false
            }
            onClick={() => {
              navigate("/products");
            }}
          >
            <ImListNumbered />
          </button>
        </div>
        <div className="col-md-2 mx-3 my-1 text-center ">
          <button
            className="navbar_buttons"
            disabled={
              !home || appContext.appState !== APP_STATES.DEFAULT ? true : false
            }
            onClick={() => {
              navigate("/shoppingItems");
            }}
          >
            <AiOutlineShoppingCart />
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavigationBar;
