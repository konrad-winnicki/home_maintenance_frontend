import React, {useContext} from "react";
import "./ProductDescription.css";
import { ask_new_name } from "../functions";
import { custom_quantity } from "../functions";
import { updateProduct } from "../services/store";
import { server_response_service } from "../functions";
import { ProductContext } from "../contexts/productContext";
import { AppContext } from "../contexts/appContext";
import { APP_STATES } from "./Dashboard";
function ProductDescription() {
  const session_code = localStorage.getItem("session_code");
  const productContext = useContext(ProductContext)
  const appContext = useContext(AppContext)
  const onClickNameHandler = () => {
    appContext.stateChanger({ app_state: APP_STATES.ONCLICK });
    const new_name = ask_new_name();
    if (new_name != null) {
      const product_data = {
        id: productContext.product.product_id,
        updatedValues: {
          quantity: productContext.product.quantity,
          name: new_name,
        },
      };
      let response = updateProduct(product_data, session_code);
      const messages = {
        unlogged: "Not logged",
        success: "Name changed",
        unknown: "Unknown error",
      };
      server_response_service(messages, response).then(() => {
        appContext.stateChanger({appState:APP_STATES.REFRESHING});
      });
    } else {
      appContext.stateChanger({appState:APP_STATES.DEFAULT});
    }
  };

  const onClickQuantityHandler = () => {
    appContext.stateChanger({appState:APP_STATES.ONCLICK});
    const quantity = custom_quantity();
    if (quantity != null) {
      const product_data = {
        id: productContext.product.product_id,
        updatedValues: {
          quantity: quantity,
          name: productContext.product.name,
        },
      };
      const response = updateProduct(product_data, session_code);

      const messages = {
        unlogged: "Not logged",
        success: "Quantity changed",
        unknown: "Unknown error",
      };
      server_response_service(messages, response).then(() => {
        appContext.stateChanger({appState:APP_STATES.REFRESHING});
      });
    } else {
      appContext.stateChanger({appState:APP_STATES.DEFAULT});
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
        {productContext.product.name}
      </div>

      <div
        className="product__quantity"
        onClick={() => {
          onClickQuantityHandler();
        }}
      >
        {productContext.product.quantity}
      </div>
    </React.Fragment>
  );
}

export default ProductDescription;
