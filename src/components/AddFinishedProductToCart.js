import React, { useContext } from "react";
import { addFinishedProductsToShoppingList } from "../services/cart";
import { server_response_service } from "../functions";
import { AppContext } from "../contexts/appContext";
import { APP_STATES } from "./Dashboard";

const AddFinishedProductsToCart = () => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);

  const addFinishedProductToShoppingList = () => {
    appContext.stateChanger({ app_state: APP_STATES.AWAITING_API_RESPONSE });

    let response = addFinishedProductsToShoppingList(session_code);
    const messages = {
      unlogged: "Not logged",
      success: "Product added to cart",
      unknown: "Unknown error",
    };
    server_response_service(messages, response);
    appContext.stateChanger({ app_state: APP_STATES.DEFAULT });
  };

  return (
    <button
      className="btn btn-warning btn-sm"
      disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
      onClick={() => {
        addFinishedProductToShoppingList();
      }}
    >
      Add to shopping list
    </button>
  );
};

export default AddFinishedProductsToCart;
