import React, { useContext } from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { updateProduct } from "../../services/store";
import { APP_STATES } from "../../applicationStates";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
import {
  errorHandler,
  notificator,
  serverResponseResolver,
} from "../../services/auxilaryFunctions";
import "../ResourceButtons.css";
import { HomeContext } from "../../contexts/homeContext";
import { logOut } from "../../services/loginAuxilaryFunctions";

const IncreaseButton = () => {
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
        quantity: productContext.resource.quantity + 1,
        name: productContext.resource.name,
        category: category
      },
    };
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const notificatorMessages = {
      unknown: "Unknown error",
    };

    updateProduct(product_data, homeId, session_code)
      .then((response) => {
        console.log('DDDD', product_data)
        return serverResponseResolver(response).then((result) => {
          const actions = {
            200: () => {
              const newValues = {
                product_id: product_data.id,
                category: category,
                name: product_data.updatedValues.name,
                quantity: product_data.updatedValues.quantity,
              };
              console.log('NNNN', newValues)
              productContext.modifyProductInState(newValues,category);
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

  return (
    <button
      className="resource_button"
      disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
      onClick={() => {
        onClickHandler();
      }}
    >
      <BsFillArrowUpSquareFill />
    </button>
  );
};

export default IncreaseButton;
