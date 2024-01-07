import React, { useContext } from "react";
import { getProducts } from "../../services/store";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import AddProductButton from "./AddProductButton";
import AddFinishedProductsToCart from "./AddFinishedProductToCart.js";
import ProductList from "./ProductList.js";
import Scaner from "../Scaner.js";
import styles from "../../my-style.module.css";
import "../CardHeader.css";
import { APP_STATES } from "../../applicationStates";
import { AppContext } from "../../contexts/appContext";
import { HomeContext } from "../../contexts/homeContext";
import { BottomNavBar } from "../commonComponents/BottomNavBar";

class ProductsCard extends React.PureComponent {
  constructor() {
    super();
    this.stateChanger = this.stateChanger.bind(this);
    this.addProductToState = this.addProductToState.bind(this);
    this.modifyProductInState = this.modifyProductInState.bind(this);
    this.deleteResourceFromState = this.deleteResourceFromState.bind(this);
    this.session_code = localStorage.getItem("session_code");
    this.state = {
      productList: [],
    };
  }

  stateChanger(new_state) {
    this.setState(new_state);
  }

  addProductToState(product) {
    this.stateChanger({
      productList: [...this.state.productList, product],
    });
  }

  deleteResourceFromState(productId) {
    console.log(this.state.productList);
    const filteredProductList = this.state.productList.filter(
      (product) => product.product_id !== productId
    );
    console.log(filteredProductList);
    this.stateChanger({ productList: filteredProductList });
  }

  modifyProductInState(productId, newValues) {
    const updatedProducts = this.state.productList.map((product) => {
      if (product.product_id === productId) {
        return newValues;
      }
      return product;
    });
    this.stateChanger({ productList: updatedProducts });
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    const homeId = this.props.homeContext.home.id;
    const response = getProducts(homeId, this.session_code);
    const messages = {
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response)
    .then((result) => {
      this.stateChanger({
        productList: result.body,
      });
    })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="row position-realtive">
          <VideoAcceptor />
        </div>

        <div className="header">
          Products in {this.props.homeContext.home?.name}:
        </div>
        <ProductList
          productList={this.state.productList}
          modifyProductInState={this.modifyProductInState}
          deleteResourceFromState={this.deleteResourceFromState}
        />

        <BottomNavBar>
          <AddProductButton
            addProductToState={this.addProductToState}
          ></AddProductButton>
          <AddFinishedProductsToCart></AddFinishedProductsToCart>
          <Scaner
            notifications={this.notifications}
            app_state={this.state.app_state}
            state_changer={this.stateChanger}
            server_response_service={serverResponseTranslator}
          ></Scaner>
        </BottomNavBar>
      </React.Fragment>
    );
  }
}

export function WrappedProductsCard() {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  return (
    <ProductsCard
      appContext={appContext}
      homeContext={homeContext}
    ></ProductsCard>
  );
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

export default ProductsCard;
