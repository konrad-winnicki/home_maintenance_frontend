import React, { useContext } from "react";
import { APP_STATES } from "../../applicationStates";
import { AppContext, AppContext2 } from "../../contexts/appContext";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { addShoppingItemsToStore } from "../../services/store";
import { HomeContext } from "../../contexts/homeContext";

const AddItemsFromShopings = () => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext2);

  const homeContext = useContext(HomeContext)
  const homeId = homeContext.home.id
  const addShoppings = () => {
    appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
    const result = addShoppingItemsToStore(homeId, session_code);
    const messages = {
      success: "Shopping items transfered",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, result).then(() => {
      appContext.stateChanger({ appState: APP_STATES.REFRESHING });
    });
  };

  return (
    <button
      type="button"
      className="btn btn-warning btn-sm"
      disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
      onClick={() => {
        addShoppings();
      }}
    >
      Add shoppings
    </button>
  );
};

export default AddItemsFromShopings;
