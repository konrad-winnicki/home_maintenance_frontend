import React, { useContext } from "react";
import { getProducts } from "../../services/store";
import { serverResponseTranslator } from "../../auxilaryFunctions";
import { ToastContainer } from "react-toastify";
import AddProductButton from "./AddProductButton";
import AddFinishedProductsToCart from "./AddFinishedProductToCart.js";
import ProductList from "./ProductList.js";
import Scaner from "../Scaner.js";
import styles from "../../my-style.module.css";
import "../Header.css";
import { APP_STATES, NavigationBar } from "../commonComponents/NavigationBar";
import { AppContext } from "../../contexts/appContext";

class ProductsCard extends React.PureComponent {
  constructor() {
    super();
    this.stateChanger = this.stateChanger.bind(this);
    this.session_code = localStorage.getItem("session_code");
    this.state = {
      productList: [],
      appState: APP_STATES.DEFAULT,
    };
  }
  stateChanger(new_state) {
    this.setState(new_state);
  }
  componentDidMount() {
    this.productListChanger();
  }

  componentDidUpdate() {
    if (this.state.appState === APP_STATES.REFRESHING) {
      this.productListChanger();
    }
  }

  productListChanger() {
    getProducts(this.session_code)
      .then((response) => {
        response.json().then((json) => {
          this.stateChanger({
            productList: json,
            appState: APP_STATES.DEFAULT,
          });
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          appState: this.state.appState,
          stateChanger: this.stateChanger,
        }}
      >
        <div>
          <NavigationBar />
          <ToastContainer></ToastContainer>
          <div className="container vh-100 vw-100 d-flex flex-column">
            <div className="row position-realtive">
              <VideoAcceptor />
            </div>

            <div
              className="flex-grow-1 mt-5 mb-8"
              style={{
                overflow: "auto",
                paddingBottom: "1%",
                marginBottom: "14%",
              }}
            >
              <div className="header">Products at home</div>
              <ProductList productList={this.state.productList} />
            </div>

            <div className="mr-0 ml-0 mt-3 pt-3 pb-3 pr-0 pl-0 bg-primary d-flex justify-content-between fixed-bottom">
              <div className="col text-center ">
                <AddProductButton></AddProductButton>
              </div>
              <div className="col text-center ">
                <AddFinishedProductsToCart></AddFinishedProductsToCart>
              </div>
              <div className="col text-center">
                <Scaner
                  notifications={this.notifications}
                  app_state={this.state.app_state}
                  state_changer={this.stateChanger}
                  server_response_service={serverResponseTranslator}
                ></Scaner>
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }

  /**/
}

export function WrappedProductsCard() {
  const appContext = useContext(AppContext);
  return <ProductsCard appContext={appContext}></ProductsCard>;
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
