import React from "react";
import DeleteButton from "./DeleteButton";
import IncreaseButton from "./IncreaseButton.js";
import DecreaseButton from "./DecreaseButton.js";
import CheckBox from "./Checkbox.js";
import ProductDescription from "./ProductDescription.js";
import styles from "../my-style.module.css";

function ProductComponent(props) {
    return (
      <div id={props.product.product_id} className={styles.product__component}>
        <ProductDescription
          className={styles.button_set}
          change_properties_in_db={props.change_properties_in_db}
          app_state={props.app_state}
          state_changer={props.state_changer}
          product={props.product}
          session_code={props.session_code}
          server_response_service = {props.server_response_service}
        ></ProductDescription>
        {props.active_component === "Store_component" ? (
          <React.Fragment>
            <div className={styles.button_surrounding}>
              <DecreaseButton
                product={props.product}
                app_state={props.app_state}
                session_code={props.session_code}
                state_changer={props.state_changer}
                server_response_service = {props.server_response_service}

              ></DecreaseButton>
            </div>
            <div className={styles.button_surrounding}>
              <IncreaseButton
                product={props.product}
                app_state={props.app_state}
                session_code={props.session_code}
                state_changer={props.state_changer}
                server_response_service = {props.server_response_service}

              ></IncreaseButton>
            </div>
          </React.Fragment>
        ) : null}
        <div className={styles.button_surrounding}>
          {props.active_component === "Cart_component" ? (
            <CheckBox
              product={props.product}
              app_state={props.app_state}
              id={props.product.product_id}
              session_code={props.session_code}
              state_changer={props.state_changer}
              checkbox_status={props.product.checkout}
              server_response_service = {props.server_response_service}

            />
          ) : null}
        </div>
        <div className={styles.button_surrounding}>
          <DeleteButton
            product={props.product}
            delete_function={props.delete_function}
            app_state={props.app_state}
            session_code={props.session_code}
            state_changer={props.state_changer}
            server_response_service = {props.server_response_service}
          ></DeleteButton>
        </div>
      </div>
    );
  }
  
  export default ProductComponent