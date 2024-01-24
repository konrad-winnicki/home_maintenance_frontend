import React, { useContext, useEffect, useState } from "react";
import { updateProduct, deleteProduct } from "../../services/store";

import ResourceDescription from "../commonComponents/ResourceDescription.js";
import ProductButtons from "./ProductButtons";
import "../ResourceComponent.css";

import { ResourceContext } from "../../contexts/resourceContext";

import { HomeContext } from "../../contexts/homeContext";
import {
  serverResponseResolver,
  errorHandler,
  notificator,
} from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import { SwipeRightContext } from "../../contexts/SwipeRight";
import { logOut } from "../../services/loginAuxilaryFunctions";

function ProductComponent() {
  const [showButtons, setShowButtons] = useState(false);

  const productContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  const homeId = homeContext.home.id;
  const sessionCode = localStorage.getItem("session_code");

  const swipeRightContext = useContext(SwipeRightContext);

  const deleteProductFromStore = () => {
    const confirmation = window.confirm(
      `Do you want to delete ${productContext.resource.name}?`
    );
    if (!confirmation) {
      return null;
    }
    const productId = productContext.resource.product_id;
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const notificatorMessages = {
      success: "Product deleted",
      unknown: "Unknown error",
    };

    deleteProduct(productId, homeId, sessionCode)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          const actions = {
            200: () => {
              productContext.deleteResourceFromState(productId);
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

  useEffect(() => {
    swipeRightContext.actionFunctionSetter(deleteProductFromStore);
    console.log("buttons", showButtons);
  }, [showButtons]);

  return (
    <div className="default_item">
      <ResourceDescription
        setShowButtons={setShowButtons}
        showButtons={showButtons}
        updateMethod={updateProduct}
      ></ResourceDescription>
      {showButtons ? <ProductButtons></ProductButtons> : ""}
    </div>
  );
}

export default ProductComponent;
