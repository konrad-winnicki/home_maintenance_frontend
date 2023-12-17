import React, { useContext } from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { serverResponseTranslator } from "../../auxilaryFunctions";
import { SourceContext } from "../../contexts/sourceContext";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "./NavigationBar";

const DeleteButton = (props) => {
  const session_code = localStorage.getItem("session_code");
  const productContext = useContext(SourceContext);
  const appContext = useContext(AppContext);
  const onClickHandler = () => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) {
      return}
      const productId = productContext.source.product_id;
      appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
      const response = props
        .deleteMethod(productId, session_code)
        
      const messages = {
        unlogged: "Not logged",
        success: "Product deleted",
        duplicated: "Product already exists",
        unknown: "Unknown error",
      };
      serverResponseTranslator(messages, response)
        .then(() => {
          appContext.stateChanger({ appState: APP_STATES.REFRESHING });
        })
    
  };

  return (
    <button
      className="btn btn-danger btn-sm "
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