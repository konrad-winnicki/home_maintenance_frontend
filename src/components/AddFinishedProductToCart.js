import React from "react";
import { add_finished_products_to_shopping_list } from "../services/cart";
class AddFinishedProductsToCart extends React.Component {
  session_code = localStorage.getItem("session_code");

  add_finished_products() {
    let result = add_finished_products_to_shopping_list(
      this.session_code
    );
    this.props.server_response_service(this.props.state_changer, result);
  }
  render() {
    return (
      <button
        className="btn btn-warning btn-sm"
        disabled={this.props.app_state !== "default" ? true : false}
        onClick={() => {
          this.props.state_changer({ app_state: "adding_finished_products" });
          this.add_finished_products();
        }}
      >
        Add to shopping list
      </button>
    );
  }
}

export default AddFinishedProductsToCart;
