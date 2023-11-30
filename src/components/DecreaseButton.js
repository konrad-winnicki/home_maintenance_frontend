import React from "react";
import {BsFillArrowDownSquareFill} from "react-icons/bs";
import { change_product_properties_in_store} from "../services/store";
import "bootstrap/dist/css/bootstrap.min.css";
class DecreaseButton extends React.Component {
    increase_quantity() {
        let product_data = {
            id: this.props.product.product_id,  
            quantity: this.props.product.quantity - 1,
            name:this.props.product.name
          }
          return change_product_properties_in_store(product_data, this.props.session_code)}
    
  render() {
    return (
      <button
      className="btn btn-primary btn-sm"
      disabled={this.props.app_state !== "default" ? true : false}
        onClick={() => {
          this.props.state_changer({ app_state: "button_clicked" });
          
          let result = this.increase_quantity()
          //inner_server_response_to_state(result, this.props.state_changer)
          this.props.server_response_service(this.props.state_changer, result);

        }}
      >
        <BsFillArrowDownSquareFill />
      </button>
    );
  }
}


export default DecreaseButton;