import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImListNumbered } from "react-icons/im";
import ShoppingList from "./ShoppingList";
import StoreProducts from "./StoreProducts";

import { AuthorizationContext } from "../contexts/authorizationContext";
import { useNavigate } from "react-router-dom";

export const url = "https://localhost:5000/products/";
//export const url = "https://kitchen-backend.fly.dev/products/"

export const APP_STATES = {
  PRODUCT_LIST: "PRODUCT_LIST",
  DEFAULT: "DEFAULT",
  SHOPPING_ITEM_LIST: "SHOPPING_ITEM_LIST",
  AWAITING_API_RESPONSE: "AWAITING_API_RESPONSE",
  REFRESHING: "REFRESHING" | "refreshing",
};
export const PRODUCT_LIST = "PRODUCT_LIST";
export const SHOPPING_ITEM_LIST = "SHOPPING_ITEM_LIST";

export const AWAITING_API_RESPONSE = "AWAITING_API_RESPONSE";

export default class Dashboard extends React.PureComponent {
  constructor() {
    super();
    this.app_state_changer = this.app_state_changer.bind(this);
    this.state = {
      showComponent: PRODUCT_LIST,
    };
    this.session_code = localStorage.getItem("session_code");
  }

  app_state_changer(new_state) {
    this.setState(new_state);
  }
/*
  componentDidUpdate() {
    if (this.state.login_status === "unlogged") {
      window.open("http://localhost:3000", "_self");
    }

    console.log("NAPAPP", this.state);
  }
*/
  render() {
    return (
      <React.Fragment>
        <nav className="navbar fixed-top bg-warning">
          <div className="col text-end">
            <button
              className="btn btn-outline-success"
              onClick={() => {
                this.setState({
                  showComponent: PRODUCT_LIST,
                  app_state: APP_STATES.DEFAULT,
                });
              }}
            >
              <ImListNumbered />
            </button>
          </div>
          <div className="col text-center ">
            <button
              className="btn btn-outline-success"
              onClick={() => {
                this.setState({
                  showComponent: SHOPPING_ITEM_LIST,
                  app_state: "default",
                });
              }}
            >
              <AiOutlineShoppingCart /> Shoping list
            </button>
          </div>
        </nav>
        {this.state.showComponent === PRODUCT_LIST ? (
          <StoreProducts
            login_status={this.state.login_status}
            active_component={this.state.showComponent}
            state_changer={this.app_state_changer}
          />
        ) : null}
        {this.state.showComponent === SHOPPING_ITEM_LIST ? (
          <ShoppingList
            state_changer={this.app_state_changer}
            active_component={this.state.showComponent}
            app_state={this.state.app_state}
          />
        ) : null}
      </React.Fragment>
    );
  }
}


export function WrappedDashboardComponent() {
  const navigate = useNavigate();
  const authorizationContext = useContext(AuthorizationContext);

  return (
    <Dashboard
      navigate={navigate}
      authorizationContext={authorizationContext}
    ></Dashboard>
  );
}