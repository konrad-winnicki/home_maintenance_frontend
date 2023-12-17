import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImListNumbered } from "react-icons/im";
import { useNavigate } from "react-router-dom";

//export const url = "https://kitchen-backend.fly.dev/products/"

export const APP_STATES = {
  DEFAULT: "DEFAULT",
  AWAITING_API_RESPONSE: "AWAITING_API_RESPONSE",
  REFRESHING: "REFRESHING",
  ONCLICK: "ONCLICK",
};



const NavigationBar = ()=> {
  const navigate = useNavigate();
    return (
      <React.Fragment>
        <nav className="navbar fixed-top bg-warning">
          <div className="col text-end">
            <button
              className="btn btn-outline-success"
              onClick={() => {
                navigate("/products");
              }}
            >
              <ImListNumbered />
            </button>
          </div>
          <div className="col text-center ">
            <button
              className="btn btn-outline-success"
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

}

export {NavigationBar}


