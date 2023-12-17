import React, { useContext } from "react";
import { addFinishedProductsToShoppingList } from "../../services/cart";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";

const AddFinishedProductsToCart = () => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);

  const addFinishedProductToShoppings = () => {
    appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
    const response = addFinishedProductsToShoppingList(session_code);
    const messages = {
      success: "Product added to cart",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      appContext.stateChanger({ appState: APP_STATES.REFRESHING });
    });
  };

  return (
    <div className="col text-center ">

    <button
      className="btn btn-warning btn-sm"
      disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
      onClick={() => {
        addFinishedProductToShoppings();
      }}
    >
      Add to shopping list
    </button>
    </div>
  );
};

export default AddFinishedProductsToCart;
