import React, { useContext } from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import "../ResourceButtons.css";
import { HomeContext } from "../../contexts/homeContext";

const DeleteButton = (props) => {
  const session_code = localStorage.getItem("session_code");
  const productContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;

  const onClickHandler = () => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) {
      return;
    }
    const productId = productContext.resource.product_id;
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const response = props.deleteMethod(productId, homeId, session_code);

    const messages = {
      success: "Product deleted",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response)
      .then(() => {
        productContext.deleteResourceFromState(productId);
      })
      .catch((error) => console.log(error))
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
      <FaTrashRestoreAlt />
    </button>
  );
};

export default DeleteButton;
