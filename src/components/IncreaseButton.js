import React from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { updateProduct } from "../services/store";
import { AWAITING_API_RESPONSE } from "./Application";
class IncreaseButton extends React.Component {
  onClickHandler() {
    const product_data = {
      id: this.props.product.product_id,
      quantity: this.props.product.quantity + 1,
      name: this.props.product.name,
    };
    this.props.state_changer({ app_state: AWAITING_API_RESPONSE });
    const result = updateProduct(product_data, this.props.session_code);
    this.props.server_response_service(this.props.state_changer, result);

  }

  render() {
    return (
      <button
        className="btn btn-primary btn-sm"
        disabled={this.props.app_state !== "default" ? true : false}
        onClick={() => {
          this.onClickHandler();
        }}
      >
        <BsFillArrowUpSquareFill />
      </button>
    );
  }
}

export default IncreaseButton;
