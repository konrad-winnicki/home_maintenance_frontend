import React from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { change_state_with_resolved_promise } from "../functions";

class DeleteButton extends React.Component {
  delete_product() {
    let product_id = this.props.product.product_id;
    let confirmation = window.confirm("Are you sure?");
    if (confirmation) {
      let product_data = {
        id: product_id,
      };
      return this.props.delete_function(product_data, this.props.session_code);
    } else {
      this.props.state_changer({ app_state: "default" });
      return null;
    }
  }

  render() {
    return (
      <button
        className="btn btn-danger btn-sm"
        disabled={this.props.app_state !== "default" ? true : false}
        onClick={() => {
          console.log("deleting");
          this.props.state_changer({ app_state: "button_clicked" });
          let result = this.delete_product();
          change_state_with_resolved_promise(result, this.props.state_changer)
        }}
      >
        <FaTrashRestoreAlt />
      </button>
    );
  }
}

export default DeleteButton;
