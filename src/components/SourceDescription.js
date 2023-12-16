import React, { useContext } from "react";
import "./SourceDescription.css";
import { ask_new_name } from "../functions";
import { custom_quantity } from "../functions";
import { server_response_service } from "../functions";
import { SourceContext } from "../contexts/sourceContext";
import { AppContext } from "../contexts/appContext";
import { APP_STATES } from "./Dashboard";

function SourceDescription(props) {
  const session_code = localStorage.getItem("session_code");
  const sourceContext = useContext(SourceContext);
  const appContext = useContext(AppContext);
  const onClickNameHandler = () => {
    appContext.stateChanger({ appState: APP_STATES.ONCLICK });
    const new_name = ask_new_name();
    if (new_name != null) {
      const product_data = {
        id: sourceContext.source.product_id,
        updatedValues: {
          ...sourceContext.source,
          name: new_name,
        },
      };
      let response = props.updateMethod(product_data, session_code);
      const messages = {
        unlogged: "Not logged",
        success: "Name changed",
        unknown: "Unknown error",
      };
      server_response_service(messages, response).then(() => {
        appContext.stateChanger({ appState: APP_STATES.REFRESHING });
      });
    } else {
      appContext.stateChanger({ appState: APP_STATES.DEFAULT });
    }
  };

  const onClickQuantityHandler = () => {
    appContext.stateChanger({ appState: APP_STATES.ONCLICK });
    const quantity = custom_quantity();
    if (quantity != null) {
      const product_data = {
        id: sourceContext.source.product_id,
        updatedValues: {
          ...sourceContext.source,
          quantity: quantity,
          
        },
      };
      const response = props.updateMethod(product_data, session_code);

      const messages = {
        unlogged: "Not logged",
        success: "Quantity changed",
        unknown: "Unknown error",
      };
      server_response_service(messages, response).then(() => {
        appContext.stateChanger({ appState: APP_STATES.REFRESHING });
      });
    } else {
      appContext.stateChanger({ appState: APP_STATES.DEFAULT });
    }
  };

  return (
    <React.Fragment>
      <div
        className="product__name"
        onClick={() => {
          onClickNameHandler();
        }}
      >
        {sourceContext.source.name}
      </div>

      <div
        className="product__quantity"
        onClick={() => {
          onClickQuantityHandler();
        }}
      >
        {sourceContext.source.quantity}
      </div>
    </React.Fragment>
  );
}

export default SourceDescription;
