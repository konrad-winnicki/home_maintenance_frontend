import React, { useCallback, useContext, useEffect, useState } from "react";
import AddItemsFromShoppings from "./AddItemsFromShoppings.js";
import { getShoppingItems } from "../../services/cart";
import "../CardHeader.css";
import ShoppingItemsList from "./ShoppingItemsList";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { HomeContext } from "../../contexts/homeContext";
import { BottomNavBar } from "../commonComponents/BottomNavBar";
import io from "socket.io-client";
import { backendUrl } from "../../config";
import AddItemToShoppings from "./AddItemToShoppings";
import { WrappedScaner } from "../Scaner.js";
import { ShoppingScanerActions } from "../ShoppingScanerActions.js";
import { VideoAcceptor } from "../VideoAcceptor.js";
export function ShoppingItemsCard() {
  const [shoppingItems, setShoppingItems] = useState([]);

  const homeContext = useContext(HomeContext);
  const session_code = localStorage.getItem("session_code");
  const showScanner = true;

  const createSocket = (session_code, homeId) => {
    const URL = backendUrl;
    const socket = io(URL, {
      autoConnect: true,
      auth: {
        session_code: session_code,
        home_context: homeId,
      },
    });
    console.log("New socket created: " + socket);

    return socket;
  };

  const ProductListChanger = useCallback(() => {
    console.log("fetch list");
    const homeId = homeContext.home.id;
    const response = getShoppingItems(homeId, session_code);
    const messages = {
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response)
      .then((result) => {
        setShoppingItems(() => {
          return [...result.body];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [homeContext.home.id, session_code]);

  useEffect(() => {
    // if (initialized.current) {
    //   return;
    // }
    // initialized.current = true;

    const socket = createSocket(session_code, homeContext.home.id);
    socket.on("updateShoppingItems", ProductListChanger);
    ProductListChanger();

    return () => {
      console.log("Unmounting component - cleaning up");
      if (socket) {
        console.log("Disconnecting socket.");
        socket.off();
        // socket.close();
        socket.disconnect();
      }
    };
  }, [ProductListChanger, homeContext.home.id, session_code]);

  return (
    <React.Fragment>
      <div className="row position-realtive">
        <VideoAcceptor />
      </div>
      <div className="header">Shopping list in {homeContext.home?.name}:</div>
      <ShoppingItemsList shoppingItems={shoppingItems}></ShoppingItemsList>
      <AddItemToShoppings></AddItemToShoppings>
      <BottomNavBar>
        <div className="col text-center ">
          <AddItemsFromShoppings></AddItemsFromShoppings>
        </div>
        <div className="col text-center">
          {showScanner ? (
            <WrappedScaner
              ScanerActions={ShoppingScanerActions}
            ></WrappedScaner>
          ) : (
            ""
          )}
        </div>
      </BottomNavBar>
    </React.Fragment>
  );
}
