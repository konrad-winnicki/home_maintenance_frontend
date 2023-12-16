import React, {useContext} from "react";
import {getProducts} from "../services/store";
import { server_response_service } from "../functions";
import { ToastContainer } from "react-toastify";
import AddProductButton from "./AddProductButton";
import AddFinishedProductsToCart from "./AddFinishedProductToCart.js";
import ProductList from "./ProductList.js";
import Scaner from "./Scaner.js";
import styles from "../my-style.module.css";
import "./Header.css";
import { APP_STATES } from "./Dashboard";
import { AppContext } from "../contexts/appContext";

class StoreProducts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.store_state_changer = this.store_state_changer.bind(this);
    this.state = {
      productList: [],
    };
    this.session_code = localStorage.getItem("session_code");
  }
  store_state_changer(new_state) {
    this.setState(new_state);
  }
  componentDidMount() {
    this.productListChanger();
    console.log("store state:", this.state);
  }

  componentDidUpdate() {
    if (this.props.appContext.appState === "unlogged") {
      this.props.appContext.stateChanger({ appState: "unlogged" });
    } else if (this.props.appContext.appState === APP_STATES.REFRESHING) {
      this.productListChanger();
    }
  }

  productListChanger() {
    getProducts(this.session_code)
      .then((response) => {
        response.json().then((json) => {
          this.store_state_changer({
            productList: json,
          });
          this.props.appContext.stateChanger({ appState: APP_STATES.DEFAULT })
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
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
            <ProductList
              productList={this.state.productList}
            />
            
          </div>

          <div
            className="mr-0 ml-0 mt-3 pt-3 pb-3 pr-0 pl-0 bg-primary 
          d-flex justify-content-between fixed-bottom"
          >
            <div className="col text-center ">
              <AddProductButton></AddProductButton>
            </div>
            <div className="col text-center ">
              <AddFinishedProductsToCart
              ></AddFinishedProductsToCart>
            </div>
            <div className="col text-center">
              <Scaner
                notifications={this.notifications}
                app_state={this.state.app_state}
                state_changer={this.store_state_changer}
                server_response_service={server_response_service}
              ></Scaner>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**/
}




export function WrappedStoreProducts() {
  const appContext = useContext(AppContext);
  return (
    <StoreProducts
      appContext={appContext}
    ></StoreProducts>
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

export default StoreProducts;
