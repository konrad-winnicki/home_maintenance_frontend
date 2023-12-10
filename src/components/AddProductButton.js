import React from "react";
import { SiAddthis } from "react-icons/si";
import { ask_product_name } from "../functions";
import { addProduct } from "../services/store";
import { AWAITING_API_RESPONSE } from "./Application";

class AddProductButton extends React.Component {
  async onClickHandler() {
    let product_name = ask_product_name();
    let product_data = {
      name: product_name,
      quantity: 1,
    };
    if (!product_name) {
      return;
    }
    this.props.state_changer({ app_state: AWAITING_API_RESPONSE });
    const response = addProduct(product_data, this.props.session_code).catch(
      (error) => console.log(error)
    );
    this.props.server_response_service(this.props.state_changer, response);
  }

  render() {
    return (
      <button
        className="btn btn-warning btn-sm"
        disabled={this.props.app_state !== "default" ? true : false}
        onClick={() => this.onClickHandler()}
      >
        <SiAddthis /> product
      </button>
    );
  }
}

export default AddProductButton;
