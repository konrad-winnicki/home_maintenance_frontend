import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";

import { getShoppingItems } from "../../services/cart";
import AddItemsFromShoppings from "./AddItemsFromShoppings.js";
import AddItemToShoppings from "./AddItemToShoppings";
import Scaner from "../Scaner.js";
import "../CardHeader.css";
import { AppContext } from "../../contexts/appContext";
import ShoppingItemsList from "./ShoppingItemsList";
import NavigationBar from "../commonComponents/NavigationBar";
import { APP_STATES } from "../../applicationStates";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { SocketContext } from "../../contexts/socketContext";
import { HomeContext } from "../../contexts/homeContext";

class ShoppingItemsCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shoppingItemsList: [],
      appState: APP_STATES.DEFAULT,
    };
    this.session_code = localStorage.getItem("session_code");
    this.stateChanger = this.stateChanger.bind(this);
  }

  stateChanger(new_state) {
    this.setState(new_state);
  }
  componentDidMount() {
    window.addEventListener("beforeunload", () => {
      this.props.socketContext.socket?.disconnect();
    });

    //const homeId = this.props.homeContext.home.id
    const socket = this.props.socketContext.createSocket(
      this.session_code,
      'b9e3c6fc-bc97-4790-9f46-623ce14b25f1'
      //homeId
    );

    socket.connect();
    this.props.socketContext.setSocket(socket);
    socket?.on("updateShoppingItems", () => {
      this.ProductListChanger();
    });

    this.ProductListChanger();
  }

  ProductListChanger() {
    
    this.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
    const response = getShoppingItems(this.session_code);
    response
      .then((response) => {
        response.json().then((json) => {
          this.stateChanger({
            shoppingItemsList: json,
          });
        });
      })
      .catch((error) => console.log(error));

    const messages = {
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      this.stateChanger({ appState: APP_STATES.DEFAULT });
    });
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
            <div
              className="flex-grow-1 mt-5"
              style={{
                overflow: "auto",
                paddingBottom: "1%",
                marginBottom: "14%",
              }}
            >
              <div className="header">Shopping list in the {this.props.homeContext.home?.name}</div>
              <ShoppingItemsList
                shoppingItemsList={this.state.shoppingItemsList}
              ></ShoppingItemsList>

              <div className="row mt-5 sticky-top">
                <AddItemToShoppings></AddItemToShoppings>
              </div>
            </div>

            <div
              className="mr-0 ml-0 mt-3 pt-3 pb-3 pr-0 pl-0 bg-primary 
          d-flex justify-content-between fixed-bottom"
            >
              <div className="col text-center ">
                <AddItemsFromShoppings
                  shoppingItemsList={this.state.shoppingItemsList}
                ></AddItemsFromShoppings>
              </div>
              <div className="col text-center">
                {this.state.showComponent != null ? (
                  <Scaner
                    notifications={this.notifications}
                    app_state={this.state.app_state}
                    state_changer={this.stateChanger}
                  ></Scaner>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export function WrappedShoppingItemsCard() {
  const appContext = useContext(AppContext);
  const socketContext = useContext(SocketContext);
  const homeContext = useContext(HomeContext)

  return (
    <ShoppingItemsCard
      appContext={appContext}
      socketContext={socketContext}
      homeContext={homeContext}
    ></ShoppingItemsCard>
  );
}

export default ShoppingItemsCard;
