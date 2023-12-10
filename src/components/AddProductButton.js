import React from "react";
import { SiAddthis } from "react-icons/si";
import { ask_product_name } from "../functions";
import { add_product } from "../services/store";

class AddProductButton extends React.Component {
  async addProduct() {
    let product_name = ask_product_name();
    let product_data = {
      name: product_name,
      quantity: 1,
    };
    if (product_name != null) {
      return add_product(product_data, this.props.session_code)
        .then((response) => {
          return response;
        })
        .catch((error) => console.log(error));
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
          let response = this.addProduct()
          
            this.props.server_response_service(
              this.props.state_changer,
              response
            )
        
        }}
      >
        <SiAddthis /> product
      </button>
    );
  }
}

export default AddProductButton;
