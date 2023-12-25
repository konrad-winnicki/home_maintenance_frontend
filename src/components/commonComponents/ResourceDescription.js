import React, { useContext } from "react";
import "./ResourceDescription.css";
import { ask_new_name } from "../../services/auxilaryFunctions";
import { custom_quantity } from "../../services/auxilaryFunctions";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext} from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import { HomeContext } from "../../contexts/homeContext";

function ResourceDescription(props) {
  const session_code = localStorage.getItem("session_code");
  const resourceContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;

  const onClickNameHandler = () => {
    const new_name = ask_new_name();
    if (new_name == null) {
      return;
    }

    const {product_id, ...resource_without_product_id} = resourceContext.resource

    const product_data = {
      id: product_id,
      updatedValues: {
        ...resource_without_product_id,
        name: new_name,
      },
    };
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    let response = props.updateMethod(product_data, homeId, session_code);
    const messages = {
      success: "Name changed",
      unknown: "Unknown error",
    };

    serverResponseTranslator(messages, response).then(() => {
      appContext.setAppState(APP_STATES.REFRESHING);
    });
  };

  const onClickQuantityHandler = () => {
    const quantity = custom_quantity();
    if (quantity == null) {
      return;
    }

    const {product_id, ...resource_without_product_id} = resourceContext.resource
    const product_data = {
      id: product_id,
      updatedValues: {
         ...resource_without_product_id,
        quantity: quantity,
      },
    };
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const response = props.updateMethod(product_data, homeId, session_code);

    const messages = {
      success: "Quantity changed",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      appContext.setAppState(APP_STATES.REFRESHING);
    });
  };

  return (
    <React.Fragment>
      <div
        className="product__name"
        onClick={() => {
          onClickNameHandler();
        }}
      >
        {resourceContext.resource.name}
      </div>

      <div
        className="product__quantity"
        onClick={() => {
          onClickQuantityHandler();
        }}
      >
        {resourceContext.resource.quantity}
      </div>
    </React.Fragment>
  );
}

export default ResourceDescription;
