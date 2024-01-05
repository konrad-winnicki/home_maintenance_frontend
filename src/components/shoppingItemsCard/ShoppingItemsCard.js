import React, { useContext, useEffect, useRef, useState } from "react";

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

export function ShoppingItemsCard() {
  const initialized = useRef(false);
  const appContext = useContext(AppContext);
  const socketContext = useContext(SocketContext);
  const homeContext = useContext(HomeContext);
  const [shoppingItems, setShoppingItems] = useState([]);
  const session_code = localStorage.getItem("session_code");
  const showScanner = false;
  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
    // TODO: this may not be called?

    window.addEventListener("beforeunload", () => {
      console.log("window event: beforeunload");
      socketContext.socket?.disconnect();
    });

    const socket = socketContext.createSocket(
      session_code,
      homeContext.home.id
    );

    socketContext.setSocket(socket);
    socket?.on("updateShoppingItems", () => {
      ProductListChanger();
    });

    ProductListChanger();
    
    return () => {
      const socket = socketContext.socket;
      if (socket) {
        console.log("Disconnecting socket.");
        socket.off("updateShoppingItems");
        socket.close();
        socket.disconnect();
        socketContext.socket = null;
      }
    };
  }, [session_code]);

  function ProductListChanger() {
    const homeId = homeContext.home.id;

    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const response = getShoppingItems(homeId, session_code);
    response
      .then((response) => {
        response.json().then((json) => {
          setShoppingItems(json);
        });
      })
      .catch((error) => console.log(error));

    const messages = {
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response)
      .then(() => {
        appContext.setAppState(APP_STATES.DEFAULT);
      })
      .catch((error) => console.log(error));
  }

  return (
     <React.Fragment>
      <div className="header">
        Shopping list in {homeContext.home?.name}:
      </div>

      <ShoppingItemsList
        shoppingItems={shoppingItems}
      ></ShoppingItemsList>

      <BottomNavBar>
        <div className="col text-center ">
          <AddItemsFromShoppings
          ></AddItemsFromShoppings>
        </div>
        <div className="col text-center">
          {showScanner? <Scaner
            notifications={appContext.notifications}
            app_state={appContext.appState}
            state_changer={appContext.setAppState}
          ></Scaner>: ""}
        </div>
      </BottomNavBar>
    </React.Fragment>
  );
}
