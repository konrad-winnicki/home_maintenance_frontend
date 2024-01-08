import React, { useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { ImListNumbered } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../../contexts/homeContext";
import "./NavigationBarButtons.css";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";

const NavigationBar = () => {
  const homeContext = useContext(HomeContext);
  const appContext = useContext(AppContext);

  const home = homeContext.home;
  const navigate = useNavigate();


  useEffect(()=>{
    console.log('nav', appContext.appState)
  })
  return (
    <React.Fragment>
      <nav className="navbar sticky-top" style={{ backgroundColor: "#f6bd60" }}>
        
        <div className="col-md-2 mx-1 my-1 text-center ">
          <button
          disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}

            className="navbar_buttons"
            onClick={() => {
              navigate("/homes");
            }}
          >
            <IoHome /> Homes
          </button>
        </div>
        <div className="col-md-1 mx-1 my-1 text-end">
          <button
            className="navbar_buttons"
            disabled={!home || appContext.appState !== APP_STATES.DEFAULT ? true : false}
            onClick={() => {
              navigate("/products");
            }}
          >
            <ImListNumbered />
          </button>
        </div>
        <div className="col-md-2 mx-1 my-1 text-center ">
          <button
            className="navbar_buttons"
            disabled={!home || appContext.appState !== APP_STATES.DEFAULT ? true : false}
            onClick={() => {
              navigate("/shoppingItems");
            }}
          >
            <AiOutlineShoppingCart /> Shoping list
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavigationBar;
