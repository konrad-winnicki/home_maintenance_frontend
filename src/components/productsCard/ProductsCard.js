import React, { useContext } from "react";
import { getProducts } from "../../services/store";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { ToastContainer } from "react-toastify";
import AddProductButton from "./AddProductButton";
import AddFinishedProductsToCart from "./AddFinishedProductToCart.js";
import ProductList from "./ProductList.js";
import Scaner from "../Scaner.js";
import styles from "../../my-style.module.css";
import "../CardHeader.css";
import NavigationBar from "../commonComponents/NavigationBar";
import { APP_STATES } from "../../applicationStates";
import { AppContext} from "../../contexts/appContext";
import { SocketContext } from "../../contexts/socketContext";
import { HomeContext } from "../../contexts/homeContext";


class ProductsCard extends React.PureComponent {
  constructor() {
    super();
    this.stateChanger = this.stateChanger.bind(this);
    this.session_code = localStorage.getItem("session_code");
  
    this.state = {
      productList: [],
    };
  }
  stateChanger(new_state) {
    this.setState(new_state);
  }
  componentDidMount() {
   this.props.socketContext.socket?.disconnect();
    this.getProducts();
  }

  componentDidUpdate() {
  
    if (this.props.appContext.appState === APP_STATES.REFRESHING) {
      this.getProducts();

    }
  }

  getProducts() {
    const homeId = this.props.homeContext.home.id
    this.props.appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const response = getProducts(homeId,this.session_code);
    response
      .then((response) => {
        response.json().then((json) => {
          this.stateChanger({
            productList: json,
          });
        });
      })
      .catch((error) => console.log(error));

    const messages = {
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      this.props.appContext.setAppState(APP_STATES.DEFAULT)
    });
  }

  render() {
    return (
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

              <div className="header mt-10">Products in the {this.props.homeContext.home?.name}</div>
              <ProductList productList={this.state.productList} />
            </div>

            <div className="mr-0 ml-0 mt-3 pt-3 pb-3 pr-0 pl-0 bg-primary d-flex justify-content-between fixed-bottom">
              <AddProductButton></AddProductButton>
              <AddFinishedProductsToCart></AddFinishedProductsToCart>
              <Scaner
                notifications={this.notifications}
                app_state={this.state.app_state}
                state_changer={this.stateChanger}
                server_response_service={serverResponseTranslator}
              ></Scaner>
            </div>
        </div>
      </div>
    );
  }

  /**/
}

export function WrappedProductsCard() {
  const appContext = useContext(AppContext);
  const socketContext = useContext(SocketContext);
  const homeContext = useContext(HomeContext);

  return (
    <ProductsCard
      appContext={appContext}
      socketContext={socketContext}
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
