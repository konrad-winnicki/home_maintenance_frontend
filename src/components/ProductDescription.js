import React from "react";
import styles from "../my-style.module.css";
import { change_name
} from "../functions";
import { change_quantity } from "../functions";
import { change_state_with_resolved_promise } from "../functions";


function ProductDescription(props) {
  
  const change_name_in_database = () => {
    props.state_changer({ app_state: "changing_name" });
    let result = change_name(
      props.product,
      props.session_code,
      props.change_properties_in_db
    );
    change_state_with_resolved_promise(result, props.state_changer )
  }

  const change_quantity_in_database = () => {
    props.state_changer({ app_state: "changing_product_quantity" });
    let result = change_quantity(
      props.product,
      props.session_code,
      props.change_properties_in_db
    );
    change_state_with_resolved_promise(result, props.state_changer )
  }

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

  export default ProductDescription