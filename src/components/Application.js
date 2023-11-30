import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImListNumbered } from "react-icons/im";
import ShoppingList from "./ShoppingList";
import StoreProducts from "./StoreProducts";
export const url = "https://localhost:5000/products/";
//export const url = "https://kitchen-backend.fly.dev/products/"

export default class Application extends React.PureComponent {
  constructor(props) {
    super(props);
    this.app_state_changer = this.app_state_changer.bind(this);
    this.state = {
      login_status: "logged",
      showComponent: null,
    };
  }





  app_state_changer(new_state) {
    this.setState(new_state);
  }

  componentDidUpdate() {
    if (this.state.login_status === "unlogged") {
      window.open("http://localhost:3000", "_self");
    }

    console.log("NAPAPP", this.state);
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar fixed-top bg-warning">
          <div className="col text-end">
            <button
              className="btn btn-outline-success"
              onClick={() => {
                this.setState({
                  showComponent: "Store_component",
                  app_state: "default",
                });
              }}
            >
              <ImListNumbered />
            </button>
          </div>
          <div className="col text-center ">
            <button
              className="btn btn-outline-success"
              onClick={() => {
                this.setState({
                  showComponent: "Cart_component",
                  app_state: "default",
                });
              }}
            >
              <AiOutlineShoppingCart /> Shoping list
            </button>
          </div>
        </nav>
        {this.state.showComponent === "Store_component" ? (
          <StoreProducts
            session_code={this.props.session_code}
            login_status={this.state.login_status}
            active_component={this.state.showComponent}
            state_changer = {this.app_state_changer}
          />
        ) : null}
        {this.state.showComponent === "Cart_component" ? (
          <ShoppingList
            session_code={this.props.session_code}
            state_changer={this.app_state_changer}
            active_component={this.state.showComponent}
            app_state={this.state.app_state}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
