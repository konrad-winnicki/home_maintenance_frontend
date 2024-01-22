import React, { useContext, useState } from "react";
import "./ResourceDescription.css";
import {
  serverResponseResolver,
  notificator,
  actionTaker,
} from "../../services/auxilaryFunctions";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import { HomeContext } from "../../contexts/homeContext";

export function ChangeResource(props) {
  const resourceContext = useContext(ResourceContext);

  const [inputValue, setInputValue] = useState(props.resourceValue);

  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  function extractResourceIdFromProperties() {
    const { product_id: resource_id, ...properties } = resourceContext.resource;
    return { id: resource_id, properties };
  }

  function resourceWithUpdatedName(newValue) {
    const resourceData = extractResourceIdFromProperties();
    if (newValue === resourceData.properties.name || newValue === "") {
      return null;
    }
    const resource_data = {
      id: resourceData.id,
      updatedValues: {
        ...resourceData.properties,
        name: newValue,
      },
    };
    return resource_data;
  }

  function resourceWithUpdatedQuantity(newValue) {
    const resourceData = extractResourceIdFromProperties();
    if (newValue === resourceData.properties.quantity) {
      return null;
    }

    const resource_data = {
      id: resourceData.id,
      updatedValues: {
        ...resourceData.properties,
        quantity: Math.abs(newValue),
      },
    };
    return resource_data;
  }

  function resourceWithUpdatedProperty(propertyName) {
    switch (propertyName) {
      case "Name":
        return resourceWithUpdatedName(inputValue);
      case "Quantity":
        return resourceWithUpdatedQuantity(inputValue);
      default:
        return null;
    }
  }

  const sendData = () => {
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    let updatedResource = resourceWithUpdatedProperty(props.resourceName);
    if (updatedResource) {
      props
        .updateMethod(updatedResource, homeId, session_code)
        .then((response) => {
          const notificatorMessages = {
            success: `${props.resourceName} changed`,
            duplicated: "Product already exists",
            unknown: "Unknown error",
          };
          serverResponseResolver(response).then((result) => {
            actionTaker(result.statusCode, () => {
              resourceContext.modifyProductInState({
                ...updatedResource.updatedValues,
                product_id: updatedResource.id,
              });
            });
            notificator(result.statusCode, notificatorMessages);
          });
        })
        .catch((error) => console.log(error))
    }

    appContext.setAppState(APP_STATES.DEFAULT);

  };

  return (
    <input
      value={inputValue}
      autoFocus
      className="form-control input-lg"
      style={{
        fontWeight: "bold",
        display: "inline-block",
      }}
      type={props.resourceType}
      min="0"
      onChange={handleChange}
      onClick={() => {
        sendData();
      }}
      onBlur={() => {
        sendData();
      }}
    ></input>
  );
}

export default ChangeResource;
