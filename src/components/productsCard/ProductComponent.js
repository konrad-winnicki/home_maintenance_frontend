import React, { useContext, useEffect, useState } from "react";
import { updateProduct, deleteProduct } from "../../services/store";

import ResourceDescription from "../commonComponents/ResourceDescription.js";
import ProductButtons from "./ProductButtons";
import "../ResourceComponent.css";

import { ResourceContext } from "../../contexts/resourceContext";

import { HomeContext } from "../../contexts/homeContext";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import { SwipeRightContext } from "../../contexts/SwipeRight";

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
      return;
    }
    const productId = productContext.resource.product_id;
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const response = deleteProduct(productId, homeId, sessionCode);

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

  
  useEffect(()=>{
    swipeRightContext.setActionFunction(() => deleteProductFromStore)

  },[])

  return (
    <div
      className="product__properties"
    >
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
