import React, { useContext } from "react";
import { addFinishedProductsToShoppingList } from "../../services/cart";
import { serverResponseTranslator } from "../../auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../commonComponents/NavigationBar";

const AddFinishedProductsToCart = () => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);

  const addFinishedProductToShoppings = () => {
    appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
    const response = addFinishedProductsToShoppingList(session_code)
    const messages = {
      unlogged: "Not logged",
      success: "Product added to cart",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(()=>{
      appContext.stateChanger({ appState: APP_STATES.REFRESHING });

    })
  };

  return (
    <button
      className="btn btn-warning btn-sm"
      disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
      onClick={() => {
        addFinishedProductToShoppings();
      }}
    >
      Add to shopping list
    </button>
  );
};

export default AddFinishedProductsToCart;
