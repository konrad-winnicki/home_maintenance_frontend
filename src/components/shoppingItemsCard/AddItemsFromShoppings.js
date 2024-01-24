import React, { useContext } from "react";
import { APP_STATES } from "../../applicationStates";
import { AppContext } from "../../contexts/appContext";
import {
  serverResponseResolver,
  notificator,
} from "../../services/auxilaryFunctions";
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
    const notificatorMessages = {
      success: "Shopping items transfered",
      unknown: "Unknown error",
    };
    addShoppingItemsToStore(homeId, session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          notificator(result.statusCode, notificatorMessages);
        });
      })
      .catch((error) => {
        console.log(error);
        notificator(500, notificatorMessages);
      });

    appContext.setAppState(APP_STATES.DEFAULT);
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
