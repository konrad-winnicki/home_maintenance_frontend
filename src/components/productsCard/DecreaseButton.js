import React, { useContext } from "react";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { updateProduct } from "../../services/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { APP_STATES } from "../../applicationStates";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import "../ResourceButtons.css";
import { HomeContext } from "../../contexts/homeContext";

const DecreaseButton = () => {
  const session_code = localStorage.getItem("session_code");
  const productContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;
  const onClickHandler = () => {
    const product_data = {
      id: productContext.resource.product_id,
      updatedValues: {
        quantity: productContext.resource.quantity - 1,
        name: productContext.resource.name,
      },
    };
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const response = updateProduct(product_data, homeId, session_code);

    const messages = {
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response)
      .then(() => {
        const newValues = {
          product_id: product_data.id,
          name: product_data.updatedValues.name,
          quantity: product_data.updatedValues.quantity,
        };
        productContext.modifyProductInState(product_data.id, newValues);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        appContext.setAppState(APP_STATES.DEFAULT);
      });
  };

  return (
    <button
      className="resource_button"
      disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
      onClick={() => {
        onClickHandler();
      }}
    >
      <BsFillArrowDownSquareFill />
    </button>
  );
};

export default DecreaseButton;
