import React from "react";
import './ProductDescription.css'
import { ask_new_name } from "../functions";
import { custom_quantity } from "../functions";

function ProductDescription(props) {
  
  const onClickNameHandler = () => {
    props.state_changer({ app_state: "changing_name" });
    const new_name = ask_new_name();
    if (new_name != null) {
      const product_data = {
        id: props.product.product_id,
        updatedValues:{
        quantity: props.product.quantity,
        name: new_name}
      };
      let result = props.updateProduct(
        product_data,
        props.session_code
      );
      props.server_response_service(props.state_changer, result);
    } else {
      props.state_changer({ app_state: "default" });
    }
  };

  const onClickQuantityHandler = () => {
    props.state_changer({ app_state: "changing_product_quantity" });
    const quantity = custom_quantity();
    if (quantity != null) {
      const product_data = {
        id: props.product.product_id,
        updatedValues:{
        quantity: quantity,
        name: props.product.name}
      };
      const result = props.updateProduct(
        product_data,
        props.session_code
      );
      props.server_response_service(props.state_changer, result);
    } else {
      props.state_changer({ app_state: "default" });
    }
  };

  return (
    <React.Fragment>
      <div
        className='product__name'
        onClick={() => {
          onClickNameHandler();
        }}
      >
        {props.product.name}
      </div>

      <div
        className='product__quantity'
        onClick={() => {
          onClickQuantityHandler();
        }}
      >
        {props.product.quantity}
      </div>
    </React.Fragment>
  );
}

export default ProductDescription;
