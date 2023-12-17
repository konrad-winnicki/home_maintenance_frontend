import React, { useContext } from "react";
import "./SourceDescription.css";
import { ask_new_name } from "../../auxilaryFunctions";
import { custom_quantity } from "../../auxilaryFunctions";
import { serverResponseTranslator } from "../../auxilaryFunctions";
import { SourceContext } from "../../contexts/sourceContext";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "./NavigationBar";

function SourceDescription(props) {
  const session_code = localStorage.getItem("session_code");
  const sourceContext = useContext(SourceContext);
  const appContext = useContext(AppContext);

  const onClickNameHandler = () => {
    const new_name = ask_new_name();
    if (new_name != null) {
      const product_data = {
        id: sourceContext.source.product_id,
        updatedValues: {
          ...sourceContext.source,
          name: new_name,
        },
      };
      appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });

      let response = props.updateMethod(product_data, session_code);
      const messages = {
        unlogged: "Not logged",
        success: "Name changed",
        unknown: "Unknown error",
      };
      serverResponseTranslator(messages, response)
        .then(() => {
          appContext.stateChanger({ appState: APP_STATES.REFRESHING });
        })
        .catch((error) => console.log(error));
    } else {
      appContext.stateChanger({ appState: APP_STATES.DEFAULT });
    }
  };

  const onClickQuantityHandler = () => {
    const quantity = custom_quantity();
    if (quantity != null) {
      const product_data = {
        id: sourceContext.source.product_id,
        updatedValues: {
          ...sourceContext.source,
          quantity: quantity,
        },
      };
      appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });

      const response = props.updateMethod(product_data, session_code);

      const messages = {
        unlogged: "Not logged",
        success: "Quantity changed",
        unknown: "Unknown error",
      };
      serverResponseTranslator(messages, response).then(() => {
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
