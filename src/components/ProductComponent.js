import React from "react";

import ProductDescription from "./ProductDescription.js";
import ProductButtons from "./ProductButtons";
import "./ProductComponent.css";

function ProductComponent(props) {
  return (
    <div id={props.product.product_id} className="product__properties">
      <ProductDescription
        change_properties_in_db={props.change_properties_in_db}
        app_state={props.app_state}
        state_changer={props.state_changer}
        product={props.product}
        session_code={props.session_code}
        server_response_service={props.server_response_service}
      ></ProductDescription>
      <ProductButtons
      active_component = {props.active_component} 
      delete_function = {props.delete_function}
      product={props.product}
      app_state={props.app_state}
      session_code={props.session_code}
      state_changer={props.state_changer}
      server_response_service={props.server_response_service}
      ></ProductButtons>
    </div>
  );
}

export default ProductComponent;
