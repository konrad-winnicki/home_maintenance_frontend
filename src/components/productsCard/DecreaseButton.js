import React, { useContext } from "react";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { updateProduct } from "../../services/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { APP_STATES } from "../../applicationStates";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
import {
  serverResponseResolver,
  errorHandler,
  notificator,
} from "../../services/auxilaryFunctions";
import "../ResourceButtons.css";
import { HomeContext } from "../../contexts/homeContext";
import { logOut } from "../../services/loginAuxilaryFunctions";

const DecreaseButton = () => {
  const session_code = localStorage.getItem("session_code");
  const productContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  const homeId = homeContext.home.id;
  const category =  productContext.resource.category

  const onClickHandler = () => {
    const product_data = {
      id: productContext.resource.product_id,
      updatedValues: {
        quantity: productContext.resource.quantity - 1,
        name: productContext.resource.name,
        category: category
      },
    };
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const notificatorMessages = {
      badRequest: "Quantity can not be below 0",
      unknown: "Unknown error",
    };

    updateProduct(product_data, homeId, session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          const body = result.body;
          let statusCode = result.statusCode;

          const actions = {
            200: () => {
              const newValues = {
                product_id: product_data.id,
                name: product_data.updatedValues.name,
                category: category,
                quantity: product_data.updatedValues.quantity,
              };
              productContext.modifyProductInState(newValues, category);
            },
            401: () => {
              logOut();
            },
          };
          errorHandler(result.statusCode, actions);
          if (statusCode === 400 && !result.body.QuantityViolation) {
            statusCode = null
          }
          notificator(statusCode, notificatorMessages);
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
