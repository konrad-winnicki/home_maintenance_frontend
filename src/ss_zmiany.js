import React from "react";
import { change_state_with_resolved_promise } from "./functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImListNumbered } from "react-icons/im";
import { MdAddBox } from "react-icons/md";
import styles from "./my-style.module.css";
import AddProductButton from "./components/AddProductButton";
import {
  delete_product_from_store,
  get_products_from_store,
  change_product_properties_in_store,
  add_shoppings_to_store,
  prepareListOfFinishedProducts,
} from "./services/store";
import ProductList from "./components/ProductList.js";
import AddItemsFromShoppings from "./components/AddItemsFromShoppings.js";
import Scaner from "./components/Scaner.js";
import {
  list_of_checked_out_items,
  add_item_to_shopping_list,
  delete_item_from_cart,
  get_items_from_shoping_list,
  change_product_properties_in_cart,
  add_finished_products_to_shopping_list,
} from "./services/cart";
import AddFinishedProductsToCart from "./components/AddFinishedProductToCart.js";

export const url = "https://localhost:5000/products/";
//const url = "https://kitchen-backend.fly.dev/products/"





export default class NadApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.app_state_changer = this.app_state_changer.bind(this);
    this.state = {
      login_status: "logged",
      app_state: "default",
      showComponent: null,
      status_code: null,
      message_from_server: null,
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
      <div className="container vh-100 vw-100 d-flex flex-column">
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
      </div>
    );
  }
}

class ShoppingList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      app_state: "default",
      product_list: [],
      checked_out_items: [],
      status_code: null,
      message_from_server: null,
      name: "",
      quantity: "",
    };
    this.shopping_list_state_changer =
      this.shopping_list_state_changer.bind(this);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  shopping_list_state_changer(new_state) {
    this.setState(new_state);
  }
  componentDidMount() {
    this.ProductListChanger();
  }

  status_code_service() {
    if (this.state.status_code > 199 && this.state.status_code < 300) {
      console.log("CODE", this.state.status_code);
      this.shopping_list_state_changer({
        app_state: "refreshing",

      });
    } else if (this.state.status_code === 409) {
      notifications(this.state.message_from_server, "warning");
      this.shopping_list_state_changer({ app_state: "default" });
    } else if (this.state.status_code != null) {
      notifications("Unknown error", "error");
      this.shopping_list_state_changer({ app_state: "default" });
    }
  }

  componentDidUpdate() {
    if (this.state.app_state === "refreshing") {
        this.shopping_list_state_changer({
          name: "",
          quantity: "",
        });
        this.ProductListChanger();
      }
    else if (this.state.status_code != null) {
      this.status_code_service();
    }

    else if  (this.state.checked_out_items.length !== 0) {
        this.add_shoppings();
        
      }
    else if (this.state.app_state === "adding_checkedout_items") {
      this.shopping_list_state_changer({
        checked_out_items: list_of_checked_out_items(this.state.product_list),
        app_state: "default"  
    });
    }
    

  }

  add_shoppings() {
    let result = add_shoppings_to_store(
      this.state.checked_out_items,
      this.props.session_code
    );
    change_state_with_resolved_promise(result, this.shopping_list_state_changer)
    this.setState({ checked_out_items: [] }); 

  }

  add_product() {
    let product_data = { name: this.state.name, quantity: this.state.quantity };
    let result = add_item_to_shopping_list(
      product_data,
      this.props.session_code
    );
    change_state_with_resolved_promise(result, this.shopping_list_state_changer)
 
}

  

  ProductListChanger() {
    let result = get_items_from_shoping_list(this.props.session_code);
    result.then((response) => {
      response.json().then((json) => {
        this.shopping_list_state_changer({
          app_state: "default",
          product_list: json,
          status_code: null,
          message_from_server: null,
        });
      });
    });
  }

  render() {
    return (
      <div>
        <div className="row flex-grow-1 mt-5" style={{ overflow: "auto" }}>
          <ProductList
            product_list={this.state.product_list}
            app_state={this.state.app_state}
            change_properties_in_db={change_product_properties_in_cart}
            state_changer={this.shopping_list_state_changer}
            session_code={this.props.session_code}
            delete_function={delete_item_from_cart}
            active_component={this.props.active_component}
          />
        </div>
        <div className="row mt-1 sticky-top">
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
              disabled={this.state.app_state !== "default" ? true : false}
              className="btn btn-primary"
              onClick={() => {
                this.shopping_list_state_changer({
                  app_state: "button_clicked",
                });
                this.add_product();
              }}
            >
              <MdAddBox />
            </button>
          </div>
        </div>
        <div
          className="mr-0 ml-0 mt-3 pt-3 pb-3 pr-0 pl-0 bg-primary 
        d-flex justify-content-between fixed-bottom"
        >
          <div className="col text-center ">
              <AddItemsFromShoppings
                app_state={this.state.app_state}
                product_list={this.state.product_list}
                state_changer={this.shopping_list_state_changer}
              ></AddItemsFromShoppings>
          </div>
          <div className="col text-center">
            {this.state.showComponent != null ? (
              <Scaner
                notifications={this.notifications}
                app_state={this.state.app_state}
                state_changer={this.shopping_list_state_changer}
              ></Scaner>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

class StoreProducts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.store_state_changer = this.store_state_changer.bind(this);
    this.state = {
      product_list: [],
      app_state: "default",
      finished_products: [],
      status_code: null,
      message_from_server: null,
    };
  }

  store_state_changer(new_state) {
    this.setState(new_state);
  }
  componentDidMount() {
    this.ProductListChanger();
    console.log("store state:", this.state);
  }

  status_code_service() {
    if (this.state.status_code > 199 && this.state.status_code < 300) {
      console.log("CODE", this.state.status_code);
      notifications(this.state.message_from_server, "success");
      this.store_state_changer({ app_state: "refreshing" });
    } else if (this.state.status_code === 409) {
      notifications(this.state.message_from_server, "warning");
      this.store_state_changer({ app_state: "default" });
    } else if (this.state.status_code != null) {
      notifications("Unknown error", "error");
      this.store_state_changer({ app_state: "default" });
    }
  }

  

  componentDidUpdate() {
    console.log("store update", this.state);

    if (this.state.app_state === "refreshing") {
      this.ProductListChanger();
    } else if (this.state.status_code != null) {
      this.status_code_service();
    }  else if (this.state.finished_products.length !== 0) {
        this.add_finished_products();
        console.log(this.state.finished_products);
      }
      else if (this.state.app_state === "adding_finished_products") {
        this.setState({
          finished_products: prepareListOfFinishedProducts(
            this.state.product_list
          ), app_state: "default"
        });
      }
  }

  ProductListChanger() {
    let result = get_products_from_store(this.props.session_code);
    result.then((response) => {
      response.json().then((json) => {
        this.store_state_changer({
          app_state: "default",
          product_list: json,
          status_code: null,
          message_from_server: null,
        });
      
      });
    });
  }

  add_finished_products() {
    let result = add_finished_products_to_shopping_list(
      this.state.finished_products,
      this.props.session_code
    );
    change_state_with_resolved_promise(result, this.store_state_changer )
    this.setState({ finished_products: [] });
     
  }

  render() {
    return (
      <div>
        <ToastContainer></ToastContainer>
        <div className="container vh-100 vw-100 d-flex flex-column">
          <div className="row position-realtive">
            <VideoAcceptor />
          </div>
          <div className="row flex-grow-1 mt-5" style={{ overflow: "auto" }}>
            <ProductList
              product_list={this.state.product_list}
              app_state={this.state.app_state}
              change_properties_in_db={change_product_properties_in_store}
              state_changer={this.store_state_changer}
              active_component={this.props.active_component}
              session_code={this.props.session_code}
              delete_function={delete_product_from_store}
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
              ></AddProductButton>
            </div>
            <div className="col text-center ">
              <AddFinishedProductsToCart
                app_state={this.state.app_state}
                product_list={this.state.product_list}
                state_changer={this.store_state_changer}
              ></AddFinishedProductsToCart>
            </div>
            <div className="col text-center">
              <Scaner
                notifications={this.notifications}
                app_state={this.state.app_state}
                state_changer={this.store_state_changer}
              ></Scaner>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function notifications(message, type) {
  console.log("dodalem notification o typie " + type);
  if (type == "success") {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
    });
  }
  if (type == "warning") {
    console.log("show notification warning");
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  if (type == "error") {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
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


