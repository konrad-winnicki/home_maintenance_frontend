import React, { useContext } from "react";
import { APP_STATES } from "../commonComponents/NavigationBar";
import { AppContext } from "../../contexts/appContext";
import { serverResponseTranslator } from "../../auxilaryFunctions";
import { addShoppingItemsToStore } from "../../services/store";

const AddItemsFromShopings = () => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);
  const addShoppings = () => {
    appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE});
    const result = addShoppingItemsToStore(session_code);
    const messages = {
      unlogged: "Not logged",
      success: "Shopping items transfered",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, result).then(() => {
      console.log('refreshing')
      appContext.stateChanger({ appState: APP_STATES.REFRESHING });
    })
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