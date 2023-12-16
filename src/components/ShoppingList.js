import React from "react";
import { ToastContainer } from "react-toastify";

import {
  delete_item_from_cart,
  get_items_from_shoping_list,
  change_product_properties_in_cart,
} from "../services/cart";
import AddItemsFromShoppings from "./AddItemsFromShoppings.js";
import AddItemToShoppings from "./AddItemToShoppings";
import ProductList from "./ProductList.js";
import Scaner from "./Scaner.js";
import { state_changer_to_server_response_for_shoppings } from "../functions";
import "./Header.css";

class ShoppingList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      app_state: "default",
      product_list: [],
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
    if (this.state.app_state === "unlogged") {
      this.props.state_changer({ login_status: "unlogged" });
    } else if (this.state.app_state === "refreshing") {
      this.ProductListChanger();
    }
  }

  ProductListChanger() {
    let result = get_items_from_shoping_list(this.session_code);
    result.then((response) => {
      console.log(response);
      if (response === 401) {
        this.props.state_changer({ login_status: "unlogged" });
      } else {
        response.json().then((json) => {
          this.shopping_list_state_changer({
            app_state: "default",
            product_list: json,
          });
        });
      }
    });
  }

  render() {
    return (
      <div>
        <ToastContainer></ToastContainer>
        <div className="container vh-100 vw-100 d-flex flex-column">
          <div className="flex-grow-1 mt-5" style={{ overflow: "auto", paddingBottom: '1%', marginBottom: '14%' }}>
            <div className="header">Shopping list</div>
            <ProductList
              product_list={this.state.product_list}
              app_state={this.state.app_state}
              change_properties_in_db={change_product_properties_in_cart}
              state_changer={this.shopping_list_state_changer}
              session_code={this.props.session_code}
              delete_function={delete_item_from_cart}
              active_component={this.props.active_component}
              server_response_service={
                state_changer_to_server_response_for_shoppings
              }
            />
            <div className="row mt-5 sticky-top">
              <AddItemToShoppings
                app_state={this.state.app_state}
                state_changer={this.shopping_list_state_changer}
                session_code={this.props.session_code}
                server_response_service={
                  state_changer_to_server_response_for_shoppings
                }
              ></AddItemToShoppings>
            </div>
          </div>

          <div
            className="mr-0 ml-0 mt-3 pt-3 pb-3 pr-0 pl-0 bg-primary 
          d-flex justify-content-between fixed-bottom"
          >
            <div className="col text-center ">
              <AddItemsFromShoppings
                app_state={this.state.app_state}
                product_list={this.state.product_list}
                state_changer={this.shopping_list_state_changer}
                session_code={this.props.session_code}
                server_response_service={
                  state_changer_to_server_response_for_shoppings
                }
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

export default ShoppingList;
