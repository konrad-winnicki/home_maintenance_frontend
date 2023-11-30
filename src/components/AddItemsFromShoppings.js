import React from "react";
import { add_shoppings_to_store } from "../services/store";
import { list_of_checked_out_items } from "../services/cart";
class AddItemsFromShopings extends React.Component {
  add_shoppings() {
    let checked_out_items = list_of_checked_out_items(this.props.product_list)

    let result = add_shoppings_to_store(
      checked_out_items,
      this.props.session_code
    );
    this.props.server_response_service(this.props.state_changer, result);
  }
    render() {
      return (
        <button
          type="button"
          className="btn btn-warning btn-sm"
          disabled={this.props.app_state !== "default" ? true : false}
          onClick={() => {
            this.props.state_changer({ app_state: "adding_checkedout_items" });
            this.add_shoppings()
        }}
        >
          Add shoppings
        </button>
      );
    }
  }

  export default AddItemsFromShopings