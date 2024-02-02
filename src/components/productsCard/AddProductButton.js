import React, { useContext, useEffect, useState } from "react";
import { SiAddthis } from "react-icons/si";
import {
  errorHandler,
  notificator,
  serverResponseResolver,
} from "../../services/auxilaryFunctions";
import { addProduct } from "../../services/store";
import { APP_STATES } from "../../applicationStates";
import { extractIdFromLocation } from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { HomeContext } from "../../contexts/homeContext";
import "../commonComponents/BottomNavbarButtons.css";
import { logOut } from "../../services/loginAuxilaryFunctions";

const AddProductButton = (props) => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;
  const onClickHandler = async () => {
    let product_data = {
      name: appContext.promptData.name,
      category: props.category,
      quantity: 1,
    };

    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const notificatorMessages = {
      success: "Product addded",
      duplicated: "Product already exists",
      unknown: "Unknown error",
    };

    addProduct(product_data, homeId, session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          const actions = {
            201: () => {
              const id = extractIdFromLocation(result.location);
              props.addProductToState({
                product_id: id,
                name: product_data.name,
                quantity: product_data.quantity,
                category: props.category
              },props.category);
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

    appContext.setAppState(APP_STATES.DEFAULT);
  };

  useEffect(() => {
    if (appContext.appState === APP_STATES.DATA_READY && appContext.showPrompt === "PRODUCT" ) {
      onClickHandler();
    }
  }, [appContext]);

  return (
    <div className="col text-center ">
      <button
        className="bottom_navbar_buttons"
        disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
        onClick={() => {
          appContext.setAppState(APP_STATES.SHOW_PROMPT)
          appContext.setShowPrompt('PRODUCT');
        }}
      >
        <SiAddthis /> product
      </button>
    </div>
  );
};

export default AddProductButton;
