import React from "react";
import { add_shoppings_to_store } from "../services/store";
class AddItemsFromShopings extends React.Component {
  add_shoppings() {
    let result = add_shoppings_to_store(this.props.session_code);
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
          this.add_shoppings();
        }}
      >
        Add shoppings
      </button>
    );
  }
}

export default AddItemsFromShopings;
