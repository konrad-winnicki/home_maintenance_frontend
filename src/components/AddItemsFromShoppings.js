import React, { useContext } from "react";
import { APP_STATES } from "./Dashboard";
import { AppContext } from "../contexts/appContext";
import { server_response_service } from "../functions";
import { addShoppingItemsToStore } from "../services/store";

const AddItemsFromShopings = () => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);
  const addShoppings = () => {
    appContext.stateChanger({ appState: APP_STATES.ONCLICK });
    let result = addShoppingItemsToStore(session_code);
    const messages = {
      unlogged: "Not logged",
      success: "Shopping items transfered",
      unknown: "Unknown error",
    };
    server_response_service(messages, result).then(() => {
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
