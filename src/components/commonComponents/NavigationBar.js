import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImListNumbered } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { HomeContext } from "../../contexts/homeContext";
import { useContext } from "react";

const NavigationBar = () => {
  const navigate = useNavigate();
  const homeContext = useContext(HomeContext);
  return (
    <React.Fragment>
      <nav className="navbar fixed-top bg-warning">
        <div className="col text-center">
          Current home: {homeContext.home?.name}
        </div>
        <div className="col text-end">
          <Link to="/homes">My homes</Link>
        </div>
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
};

export default NavigationBar;
