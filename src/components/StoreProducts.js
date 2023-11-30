import React from "react";
import {
  delete_product_from_store,
  get_products_from_store,
  change_product_properties_in_store,
} from "../services/store";
import { state_changer_to_server_response } from "../functions";
import { ToastContainer } from "react-toastify";
import AddProductButton from "./AddProductButton";
import AddFinishedProductsToCart from "./AddFinishedProductToCart.js";
import ProductList from "./ProductList.js";
import Scaner from "./Scaner.js";
import styles from "../my-style.module.css";
import Card from "./ProductComponent";
import "./Header.css";

class StoreProducts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.store_state_changer = this.store_state_changer.bind(this);
    this.state = {
      product_list: [],
      app_state: "default",
    };
  }
  store_state_changer(new_state) {
    this.setState(new_state);
  }
  componentDidMount() {
    this.ProductListChanger();
    console.log("store state:", this.state);
  }

  componentDidUpdate() {
    console.log(this.state);
    if (this.state.app_state === "unlogged") {
      this.props.state_changer({ login_status: "unlogged" });
    } else if (this.state.app_state === "refreshing") {
      this.ProductListChanger();
    }
  }

  ProductListChanger() {
    let result = get_products_from_store(this.props.session_code);
    result.then((response) => {
      console.log(response);
      if (response === 401) {
        this.props.state_changer({ login_status: "unlogged" });
      } else {
        response.json().then((json) => {
          this.store_state_changer({
            app_state: "default",
            product_list: json,
          });
        });
      }
    });
  }

  render() {
    return (
      <div>
        <ToastContainer></ToastContainer>
        <div className="container vh-100 vw-100 d-flex flex-column">
          <div className="row position-realtive">
            <VideoAcceptor />
          </div>

          <div className="flex-grow-1 mt-5 mb-8" style={{ overflow: "auto", paddingBottom: '1%', marginBottom: '14%'}}>
            <div className="header">Products at home</div>
            <ProductList
              product_list={this.state.product_list}
              app_state={this.state.app_state}
              change_properties_in_db={change_product_properties_in_store}
              state_changer={this.store_state_changer}
              active_component={this.props.active_component}
              session_code={this.props.session_code}
              delete_function={delete_product_from_store}
              server_response_service={state_changer_to_server_response}
            />
          </div>

          <div
            className="mr-0 ml-0 mt-3 pt-3 pb-3 pr-0 pl-0 bg-primary 
          d-flex justify-content-between fixed-bottom"
          >
            <div className="col text-center ">
              <AddProductButton
                app_state={this.state.app_state}
                session_code={this.props.session_code}
                state_changer={this.store_state_changer}
                server_response_service={state_changer_to_server_response}
              ></AddProductButton>
            </div>
            <div className="col text-center ">
              <AddFinishedProductsToCart
                app_state={this.state.app_state}
                product_list={this.state.product_list}
                state_changer={this.store_state_changer}
                session_code={this.props.session_code}
                server_response_service={state_changer_to_server_response}
              ></AddFinishedProductsToCart>
            </div>
            <div className="col text-center">
              <Scaner
                notifications={this.notifications}
                app_state={this.state.app_state}
                state_changer={this.store_state_changer}
                server_response_service={state_changer_to_server_response}
              ></Scaner>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class VideoAcceptor extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.video2} id={"videoStream"}></div>
      </div>
    );
  }
}

export default StoreProducts;
