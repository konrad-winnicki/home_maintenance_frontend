import React, { useState, useContext, useEffect } from "react";
import ResourceDescription from "../commonComponents/ResourceDescription.js";
import "../ResourceComponent.css";
import { updateShoppingItem, deleteShoppingItem } from "../../services/cart.js";

import "../ResourceComponent.css";

import { ResourceContext } from "../../contexts/resourceContext";

import { HomeContext } from "../../contexts/homeContext";
import {
  serverResponseResolver,
  actionTaker,
  notificator,
} from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import { SwipeRightContext } from "../../contexts/SwipeRight.js";
import CheckBox from "./Checkbox.js";

function ShoppingItemComponent() {
  const [showButtons, setShowButtons] = useState(false);

  const shoppingItemContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;
  const sessionCode = localStorage.getItem("session_code");

  const swipeRightContext = useContext(SwipeRightContext);

  const deleteFromShoppings = () => {
    const confirmation = window.confirm(
      `Do you want to delete ${shoppingItemContext.resource.name}?`
    );
    if (!confirmation) {
      return null;
    }
    const productId = shoppingItemContext.resource.product_id;
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const notificatorMessages = {
      success: "Product deleted",
      unknown: "Unknown error",
    };

    deleteShoppingItem(productId, homeId, sessionCode)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          actionTaker(result.statusCode, () => {
            shoppingItemContext.deleteResourceFromState(productId);
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

  useEffect(() => {
    swipeRightContext.actionFunctionSetter(deleteFromShoppings);
  }, []);

  return (
    <div className="default_item">
      <ResourceDescription
        setShowButtons={setShowButtons}
        updateMethod={updateShoppingItem}
      ></ResourceDescription>
      <CheckBox></CheckBox>
    </div>
  );
}

export default ShoppingItemComponent;
