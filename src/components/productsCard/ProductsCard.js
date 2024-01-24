import React, { useContext } from "react";
import { getProducts } from "../../services/store";
import {
  serverResponseResolver,
  errorHandler,
  notificator,
} from "../../services/auxilaryFunctions";
import AddProductButton from "./AddProductButton";
import AddFinishedProductsToCart from "./AddFinishedProductToCart.js";
import ProductList from "./ProductList.js";
import { WrappedScaner } from "../commonComponents/Scaner.js";
import "../CardHeader.css";
import { AppContext } from "../../contexts/appContext";
import { HomeContext } from "../../contexts/homeContext";
import { BottomNavBar } from "../commonComponents/BottomNavBar";
import { APP_STATES } from "../../applicationStates";
import { VideoAcceptor } from "../commonComponents/VideoAcceptor";
import { adOrModificateProduct } from "../barcodeActions/adOrModificateProductWithBarcode";
import { logOut } from "../../services/loginAuxilaryFunctions";

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
    const filteredProductList = this.state.productList.filter(
      (product) => product.product_id !== productId
    );
    this.stateChanger({ productList: filteredProductList });
  }

  modifyProductInState(changedResource) {
    const updatedProducts = this.state.productList.map((product) => {
      if (product.product_id === changedResource.product_id) {
        return changedResource;
      }
      return product;
    });
    this.stateChanger({ productList: updatedProducts });
  }

  componentDidMount() {
    this.props.appContext.setAppState(APP_STATES.DEFAULT);
    this.getProducts();
  }

  getProducts() {
    const homeId = this.props.homeContext.home.id;
    const notificatorMessages = {
      unknown: "Unknown error",
    };

    getProducts(homeId, this.session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          const actions = {
            200: () => {
              this.stateChanger({
                productList: result.body,
              });
            },
            401: () => {
              logOut();
            },
          };
          errorHandler(result.statusCode, actions);
          notificator(result.statusCode, notificatorMessages);
        });
      })
      .catch((error) => {
        console.log(error);
        notificator(500, notificatorMessages);
      });
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

          <WrappedScaner
            addOrModificateItem={adOrModificateProduct(
              this.addProductToState,
              this.modifyProductInState
            )}
          ></WrappedScaner>
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

export default ProductsCard;
