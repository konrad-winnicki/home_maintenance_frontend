import React, { useContext } from "react";
import { getShoppingItems } from "../../services/cart";
import AddItemsFromShoppings from "./AddItemsFromShoppings.js";
import Scaner from "../Scaner.js";
import "../CardHeader.css";
import { AppContext } from "../../contexts/appContext";
import ShoppingItemsList from "./ShoppingItemsList";
import { APP_STATES } from "../../applicationStates";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { SocketContext } from "../../contexts/socketContext";
import { HomeContext } from "../../contexts/homeContext";
import { BottomNavBar } from "../commonComponents/BottomNavBar";

class ShoppingItemsCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shoppingItemsList: [],
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

    const homeId = this.props.homeContext.home.id;
    const socket = this.props.socketContext.createSocket(
      this.session_code,
      homeId
    );

    socket.connect();
    this.props.socketContext.setSocket(socket);
    socket?.on("updateShoppingItems", () => {
      this.ProductListChanger();
    });

    this.ProductListChanger();
  }

  ProductListChanger() {
    const homeId = this.props.homeContext.home.id;

    this.props.appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const response = getShoppingItems(homeId, this.session_code);
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
    serverResponseTranslator(messages, response)
      .then(() => {
        this.props.appContext.setAppState(APP_STATES.DEFAULT);
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <React.Fragment>
        <div className="header">
          Shopping list in {this.props.homeContext.home?.name}:
        </div>

        <ShoppingItemsList
          shoppingItemsList={this.state.shoppingItemsList}
          addProductToState={this.addProductToState}
        ></ShoppingItemsList>

        <BottomNavBar>
          <div className="col text-center ">
            <AddItemsFromShoppings
              shoppingItemsList={this.state.shoppingItemsList}
            ></AddItemsFromShoppings>
          </div>
          <div className="col text-center">
            <Scaner
              notifications={this.notifications}
              app_state={this.state.app_state}
              state_changer={this.stateChanger}
            ></Scaner>
          </div>
        </BottomNavBar>
      </React.Fragment>
    );
  }
}

export function WrappedShoppingItemsCard() {
  const appContext = useContext(AppContext);
  const socketContext = useContext(SocketContext);
  const homeContext = useContext(HomeContext);

  return (
    <ShoppingItemsCard
      appContext={appContext}
      socketContext={socketContext}
      homeContext={homeContext}
    ></ShoppingItemsCard>
  );
}

export default ShoppingItemsCard;
