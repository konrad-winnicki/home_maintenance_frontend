import React from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import "./ProductComponent.css";

class DeleteButton extends React.Component {
  session_code = localStorage.getItem("session_code");

  onClickHandler() {
    const confirmation = window.confirm("Are you sure?");
    if (confirmation) {
      const productId = this.props.product.product_id;
      this.props.state_changer({ app_state: "button_clicked" });
      const response = this.props.delete_function(
        productId,
        this.session_code
      );
      this.props.server_response_service(this.props.state_changer, response);
    } else {
      this.props.state_changer({ app_state: "default" });
      return null;
    }
  }

  render() {
    return (
      <button
        className="btn btn-danger btn-sm "
        disabled={this.props.app_state !== "default" ? true : false}
        onClick={() => {
          this.onClickHandler();
        }}
      >
        <FaTrashRestoreAlt />
      </button>
    );
  }
}

export default DeleteButton;
