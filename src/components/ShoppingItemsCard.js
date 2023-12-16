import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";

import {
  deleteShoppingItem,
  get_items_from_shoping_list,
  updateShoppingItem,
} from "../services/cart";
import AddItemsFromShoppings from "./AddItemsFromShoppings.js";
import AddItemToShoppings from "./AddItemToShoppings";
import Scaner from "./Scaner.js";
import { state_changer_to_server_response_for_shoppings } from "../functions";
import "./Header.css";
import { AppContext } from "../contexts/appContext";
import ShoppingItemsList from "./ShoppingItemsList";
import { APP_STATES } from "./Dashboard";

class ShoppingItemsCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shoppingItemsList: [],
    };
    this.session_code = localStorage.getItem("session_code");

    this.shopping_list_state_changer =
      this.shopping_list_state_changer.bind(this);
  }

  shopping_list_state_changer(new_state) {
    this.setState(new_state);
  }
  componentDidMount() {
    this.ProductListChanger();
  }

  componentDidUpdate() {
    console.log('card', this.props.appContext.appState)
    if (this.state.app_state === "unlogged") {
      this.props.state_changer({ login_status: "unlogged" });
    } else if (this.props.appContext.appState === APP_STATES.REFRESHING) {
      this.ProductListChanger();
    }
  }

  ProductListChanger() {
    let result = get_items_from_shoping_list(this.session_code);
    result
      .then((response) => {
        response.json().then((json) => {
          this.shopping_list_state_changer({
            shoppingItemsList: json,
          });
          this.props.appContext.stateChanger({ appState: APP_STATES.DEFAULT });
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <ToastContainer></ToastContainer>
        <div className="container vh-100 vw-100 d-flex flex-column">
          <div
            className="flex-grow-1 mt-5"
            style={{
              overflow: "auto",
              paddingBottom: "1%",
              marginBottom: "14%",
            }}
          >
            <div className="header">Shopping list</div>
            <ShoppingItemsList
              shoppingItemsList={this.state.shoppingItemsList}
            ></ShoppingItemsList>

            <div className="row mt-5 sticky-top">
              <AddItemToShoppings
              ></AddItemToShoppings>
            </div>
          </div>

          <div
            className="mr-0 ml-0 mt-3 pt-3 pb-3 pr-0 pl-0 bg-primary 
          d-flex justify-content-between fixed-bottom"
          >
            <div className="col text-center ">
              <AddItemsFromShoppings
                shoppingItemsList={this.state.shoppingItemsList}
                
              ></AddItemsFromShoppings>
            </div>
            <div className="col text-center">
              {this.state.showComponent != null ? (
                <Scaner
                  notifications={this.notifications}
                  app_state={this.state.app_state}
                  state_changer={this.shopping_list_state_changer}
                  server_response_service={
                    state_changer_to_server_response_for_shoppings
                  }
                ></Scaner>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export function WrappedShoppingItemsCard() {
  const appContext = useContext(AppContext);
  return <ShoppingItemsCard appContext={appContext}></ShoppingItemsCard>;
}

export default ShoppingItemsCard;
