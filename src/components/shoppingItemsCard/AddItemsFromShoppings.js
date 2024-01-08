import React, { useContext } from "react";
import { APP_STATES } from "../../applicationStates";
import { AppContext } from "../../contexts/appContext";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { addShoppingItemsToStore } from "../../services/store";
import { HomeContext } from "../../contexts/homeContext";
import "../commonComponents/BottomNavbarButtons.css";

const AddItemsFromShopings = () => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);

  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;
  const addShoppings = () => {
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const result = addShoppingItemsToStore(homeId, session_code);
    const messages = {
      success: "Shopping items transfered",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, result)
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        appContext.setAppState(APP_STATES.DEFAULT);
      });
  };

  return (
    <button
      type="button"
      className="bottom_navbar_buttons"
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
