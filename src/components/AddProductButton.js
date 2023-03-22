import React from "react";
import { SiAddthis } from "react-icons/si";
import { ask_product_name } from "../functions";
import { add_product_to_store } from "../services/store";
import { inner_server_response_to_state} from "../functions";

class AddProductButton extends React.Component {
  addProduct() {
    let product_name = ask_product_name();
    let product_data = {
      name: product_name,
      quantity: 1,
    };
    if (product_name != null) {
      return add_product_to_store(product_data, this.props.session_code);
    } else {
      return null;
    }
  }

  render() {
    return (
      <button
        className="btn btn-warning btn-sm"
        disabled={this.props.app_state !== "default" ? true : false}
        onClick={() => {
          this.props.state_changer({ app_state: "Add_product" });
          let result = this.addProduct();
          this.props.server_response_service(this.props.state_changer, result);
        }}
      >
        <SiAddthis /> product
      </button>
    );
  }
}

export default AddProductButton;
