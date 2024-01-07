import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getShoppingItems } from "../../services/cart";
import AddItemsFromShoppings from "./AddItemsFromShoppings.js";
import Scaner from "../Scaner.js";
import "../CardHeader.css";
import { AppContext } from "../../contexts/appContext";
import ShoppingItemsList from "./ShoppingItemsList";
import { APP_STATES } from "../../applicationStates";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { HomeContext } from "../../contexts/homeContext";
import { BottomNavBar } from "../commonComponents/BottomNavBar";
import io from "socket.io-client";
import { backendUrl } from "../../config"

export function ShoppingItemsCard() {
  const [shoppingItems, setShoppingItems] = useState([]);

  // const initialized = useRef(false);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const session_code = localStorage.getItem("session_code");
  const showScanner = false;


  const createSocket = (session_code, homeId) => {
    const URL = backendUrl;
    const socket = io(URL, {
      autoConnect: true,
      auth: {
        session_code: session_code,
        home_context: homeId,
      },
    });

    return socket;
  };

  const ProductListChanger = useCallback(() => {
    const homeId = homeContext.home.id;
    const response = getShoppingItems(homeId, session_code);
    const messages = {
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response)
      .then((result) => {
        setShoppingItems(result.body);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [homeContext.home.id, session_code]);

  useEffect(() => {
    // if (initialized.current) {
    //   return;
    // }
    // initialized.current = true;

   
    const socket = createSocket(session_code, homeContext.home.id)
    socket.on("updateShoppingItems", ProductListChanger);
    ProductListChanger();

    return () => {
      console.log("Unmounting component - cleaning up");
      if (socket) {
        console.log("Disconnecting socket.");
        socket.off("updateShoppingItems");
        socket.close();
        socket.disconnect();
      }
    };
  }, [ProductListChanger, homeContext.home.id, session_code]);

  return (
    <React.Fragment>
      <div className="header">Shopping list in {homeContext.home?.name}:</div>

      <ShoppingItemsList shoppingItems={shoppingItems}></ShoppingItemsList>

      <BottomNavBar>
        <div className="col text-center ">
          <AddItemsFromShoppings></AddItemsFromShoppings>
        </div>
        <div className="col text-center">
          {showScanner ? (
            <Scaner
              notifications={appContext.notifications}
              app_state={appContext.appState}
              state_changer={appContext.setAppState}
            ></Scaner>
          ) : (
            ""
          )}
        </div>
      </BottomNavBar>
    </React.Fragment>
  );
}
