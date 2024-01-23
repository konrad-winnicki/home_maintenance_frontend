import React, { useContext } from "react";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { updateProduct } from "../../services/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { APP_STATES } from "../../applicationStates";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
import {
  serverResponseResolver,
  actionTaker,
  notificator,
} from "../../services/auxilaryFunctions";
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

    const notificatorMessages = {
      unknown: "Unknown error",
    };

    updateProduct(product_data, homeId, session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          actionTaker(result.statusCode, () => {
            const newValues = {
              product_id: product_data.id,
              name: product_data.updatedValues.name,
              quantity: product_data.updatedValues.quantity,
            };
            productContext.modifyProductInState(newValues);
          });

          notificator(result.statusCode, notificatorMessages);
        });
      })
      .catch((error) => {
        if (error.statusCode) {
          notificator(error.statusCode, notificatorMessages);
        } else {
          console.log(error);
        }
      });

    appContext.setAppState(APP_STATES.DEFAULT);
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
