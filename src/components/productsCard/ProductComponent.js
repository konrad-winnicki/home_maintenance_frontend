import React, { useContext, useEffect, useRef, useState } from "react";
import { updateProduct, deleteProduct } from "../../services/store";
import { addShoppingItem } from "../../services/cart";
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

function ProductComponent(props) {
  const [showButtons, setShowButtons] = useState(false);
  const productContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const swipeRightContext = useContext(SwipeRightContext);

  const sessionCode = localStorage.getItem("session_code");
  const homeId = homeContext.home.id;

 
  const deleteProductFromStore = () => {
    const confirmation = window.confirm(
      `Do you want to delete ${productContext.resource.name}?`
    );
    if (!confirmation) {
      return null;
    }
    const productId = productContext.resource.product_id;
    const category = productContext.resource.category;
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
              productContext.deleteResourceFromState(productId, category);
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

  const addShoppingItemToList = () => {
    let product_data = {
      name: productContext.resource.name,
      category: productContext.resource.category,
      quantity: 1,
    };

    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const notificatorMessages = {
      success: `${productContext.resource.name} added to shopping list`,
      duplicated: "Shopping item already exists",
      unknown: "Unknown error",
    };

    addShoppingItem(product_data, homeId, sessionCode)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          const actions = {
            201: () => {
              console.log("Shopping item added");
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
    swipeRightContext.actionFunctionSetter(deleteProductFromStore, "left");
    swipeRightContext.actionFunctionSetter(addShoppingItemToList, "right");
  }, []);

  useEffect(() => {
    if(props.productButtonClicked!==null && productContext.resource.product_id !== props.productButtonClicked){
      setShowButtons(false)
    }
   
  }, [props.productButtonClicked, showButtons]);

  return (
    <div className="default_item" style={{ zIndex: 1 }}>
      <ResourceDescription
        setClicked={props.setClicked}
        setShowButtons={setShowButtons}
        showButtons={showButtons}
        updateMethod={updateProduct}
      ></ResourceDescription>
      {showButtons ? <ProductButtons></ProductButtons> : ""}
    </div>
  );
}

export default ProductComponent;
