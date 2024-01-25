import React, { useCallback, useContext, useEffect, useState } from "react";
import AddItemsFromShoppings from "./AddItemsFromShoppings.js";
import { getShoppingItems } from "../../services/cart";
import "../CardHeader.css";
import ShoppingItemsList from "./ShoppingItemsList";
import {
  serverResponseResolver,
  notificator,
  errorHandler,
} from "../../services/auxilaryFunctions";
import { HomeContext } from "../../contexts/homeContext";
import { BottomNavBar } from "../commonComponents/BottomNavBar";
import io from "socket.io-client";
import { backendUrl } from "../../config";
import AddItemToShoppings from "./AddItemToShoppings";
import { WrappedScaner } from "../commonComponents/Scaner.js";
import { VideoAcceptor } from "../commonComponents/VideoAcceptor.js";
import { addOrModificateShoppingItem } from "../barcodeActions/addOrModificateShoppingWithBarcode.js";
import { logOut } from "../../services/loginAuxilaryFunctions.js";
import { AppContext } from "../../contexts/appContext.js";
import { APP_STATES } from "../../applicationStates.js";
export function ShoppingItemsCard() {
  const [shoppingItems, setShoppingItems] = useState([]);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const session_code = localStorage.getItem("session_code");

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

    const notificatorMessages = {
      unknown: "Unknown error",
    };

    getShoppingItems(homeId, session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          const actions = {
            200: () => {
              setShoppingItems(() => {
                return [...result.body];
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
  }, [homeContext.home.id, session_code]);

  useEffect(() => {
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

  const blur =
    appContext.appState === APP_STATES.SCANNING ? "Blur(3px)" : "Blur(0px)";

  return (
    <React.Fragment>
      <VideoAcceptor />
      <div className="header" style={{ filter: `${blur}` }}>
        Shopping list in {homeContext.home?.name}:
      </div>
      <ShoppingItemsList shoppingItems={shoppingItems}></ShoppingItemsList>
      <AddItemToShoppings></AddItemToShoppings>
      <BottomNavBar>
        <div className="col text-center ">
          <AddItemsFromShoppings></AddItemsFromShoppings>
        </div>
        <div className="col text-center">
          <WrappedScaner
            addOrModificateItem={addOrModificateShoppingItem}
          ></WrappedScaner>
        </div>
      </BottomNavBar>
    </React.Fragment>
  );
}
