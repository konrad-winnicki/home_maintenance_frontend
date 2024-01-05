import React, { useContext } from "react";
import "./ResourceDescription.css";
import { ask_new_name } from "../../services/auxilaryFunctions";
import { custom_quantity } from "../../services/auxilaryFunctions";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
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

    const { product_id: resource_id, ...resource_without_id } =
      resourceContext.resource;

    const resource_data = {
      id: resource_id,
      updatedValues: {
        ...resource_without_id,
        name: new_name,
      },
    };
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    let response = props.updateMethod(resource_data, homeId, session_code);
    const messages = {
      success: "Name changed",
      duplicated: "Product already exists",
      unknown: "Unknown error",
    };

    serverResponseTranslator(messages, response)
      .then(() => {
        const newValues = {
          ...resourceContext.resource,
          name: resource_data.updatedValues.name,
        };
        resourceContext.modifyProductInState(resource_data.id, newValues);
      })
      .then(() => {
        appContext.setAppState(APP_STATES.DEFAULT);
      })
      .catch(() => {
        appContext.setAppState(APP_STATES.DEFAULT);
      });
  };

  const onClickQuantityHandler = () => {
    const quantity = custom_quantity();
    if (quantity == null) {
      return;
    }

    const { product_id, ...resource_without_product_id } =
      resourceContext.resource;
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
    serverResponseTranslator(messages, response)
      .then(() => {
        const newValues = {
          ...resourceContext.resource,
          quantity: product_data.updatedValues.quantity,
        };
        resourceContext.modifyProductInState(product_data.id, newValues);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        appContext.setAppState(APP_STATES.DEFAULT);
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
        className="product__quantity centered-text"
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
