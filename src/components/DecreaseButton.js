import React from "react";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { updateProduct } from "../services/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { AWAITING_API_RESPONSE } from "./Dashboard";
class DecreaseButton extends React.Component {
  session_code = localStorage.getItem("session_code");

  onClickHandler() {
    const product_data = {
      id: this.props.product.product_id,
      updatedValues: {
        quantity: this.props.product.quantity - 1,
        name: this.props.product.name,
      },
    };
    this.props.state_changer({ app_state: AWAITING_API_RESPONSE });
    const result = updateProduct(product_data, this.session_code);
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
        <BsFillArrowDownSquareFill />
      </button>
    );
  }
}

export default DecreaseButton;
