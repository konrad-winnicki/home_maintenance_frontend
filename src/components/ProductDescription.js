import React from "react";
import styles from "../my-style.module.css";
import { ask_new_name } from "../functions";
import { custom_quantity } from "../functions";

function ProductDescription(props) {
  
  const change_name_in_database = () => {
    props.state_changer({ app_state: "changing_name" });
    let new_name = ask_new_name();
    if (new_name != null) {
      let product_data = {
        id: props.product.product_id,
        quantity: props.product.quantity,
        name: new_name,
      };
      let result = props.change_properties_in_db(
        product_data,
        props.session_code
      );
      props.server_response_service(props.state_changer, result);
    } else {
      props.state_changer({ app_state: "default" });
    }
  };

  const change_quantity_in_database = () => {
    props.state_changer({ app_state: "changing_product_quantity" });
    let quantity = custom_quantity();
    if (quantity != null) {
      let product_data = {
        id: props.product.product_id,
        quantity: quantity,
        name: props.product.name,
      };
      let result = props.change_properties_in_db(
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
        className={styles.table__product}
        onClick={() => {
          change_name_in_database();
        }}
      >
        {props.product.name}
      </div>

      <div
        className={styles.table__quantity}
        onClick={() => {
          change_quantity_in_database();
        }}
      >
        {props.product.quantity}
      </div>
    </React.Fragment>
  );
}

export default ProductDescription;
