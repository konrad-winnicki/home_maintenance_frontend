import React from "react";
import DeleteButton from "./DeleteButton";
import IncreaseButton from "./IncreaseButton.js";
import DecreaseButton from "./DecreaseButton.js";
import CheckBox from "./Checkbox.js";
import "./ProductButtons.css";
import { PRODUCT_LIST, SHOPPING_ITEM_LIST } from "./Application";

export default function ProductButtons(props) {
  return (
    <React.Fragment>
      {props.active_component === PRODUCT_LIST ? (
        <React.Fragment>
          <div className="button_surrounding">
            <DecreaseButton
              product={props.product}
              app_state={props.app_state}
              session_code={props.session_code}
              state_changer={props.state_changer}
              server_response_service={props.server_response_service}
            ></DecreaseButton>
          </div>
          <div className="button_surrounding">
            <IncreaseButton
              product={props.product}
              app_state={props.app_state}
              session_code={props.session_code}
              state_changer={props.state_changer}
              server_response_service={props.server_response_service}
            ></IncreaseButton>
          </div>
        </React.Fragment>
      ) : null}
      <div className="button_surrounding">
        {props.active_component === SHOPPING_ITEM_LIST ? (
          <CheckBox
            product={props.product}
            app_state={props.app_state}
            id={props.product.product_id}
            session_code={props.session_code}
            state_changer={props.state_changer}
            checkbox_status={props.product.checkout}
            server_response_service={props.server_response_service}
          />
        ) : null}
      </div>
      <div className="button_surrounding">
        <DeleteButton
          product={props.product}
          delete_function={props.delete_function}
          app_state={props.app_state}
          session_code={props.session_code}
          state_changer={props.state_changer}
          server_response_service={props.server_response_service}
        ></DeleteButton>
      </div>
    </React.Fragment>
  );
}
