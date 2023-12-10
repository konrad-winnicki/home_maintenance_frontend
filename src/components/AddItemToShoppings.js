import React from "react";
import { MdAddBox } from "react-icons/md";
import { add_item_to_shopping_list } from "../services/cart";
import { AWAITING_API_RESPONSE } from "./Application";

class AddItemToShoppings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "",
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  add_product() {
    let product_data = { name: this.state.name, quantity: this.state.quantity };
    let result = add_item_to_shopping_list(
      product_data,
      this.props.session_code
    );
    this.props.server_response_service(this.props.state_changer, result);
    this.setState({ name: "", quantity: "" });
  }

  render() {
    return (
      <React.Fragment>
        <div className="col text-center">
          <input
            value={this.state.name}
            disabled={this.props.app_state !== "default" ? true : false}
            className="form-control input-lg"
            type="text"
            placeholder="Type product name"
            onChange={this.handleChangeName}
          ></input>
        </div>
        <div className="col text-center">
          <input
            value={this.state.quantity}
            disabled={this.props.app_state !== "default" ? true : false}
            className="form-control input-lg"
            type="number"
            placeholder="Quantity"
            onChange={this.handleChangeQuantity}
          ></input>
        </div>
        <div className="col text-left">
          <button
            disabled={this.props.app_state !== "default" ? true : false}
            className="btn btn-primary"
            onClick={() => {
              this.props.state_changer({ app_state: AWAITING_API_RESPONSE });
              this.add_product();
            }}
          >
            <MdAddBox />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default AddItemToShoppings;
