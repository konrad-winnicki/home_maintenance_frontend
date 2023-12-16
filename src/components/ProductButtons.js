import React from "react";
import DeleteButton from "./DeleteButton";
import IncreaseButton from "./IncreaseButton.js";
import DecreaseButton from "./DecreaseButton.js";
import CheckBox from "./Checkbox.js";
import "./ProductButtons.css";
import { PRODUCT_LIST, SHOPPING_ITEM_LIST } from "./Dashboard";

export default function ProductButtons(props) {
  return (
    <React.Fragment>
      <div className="button_surrounding">
        <DecreaseButton></DecreaseButton>
      </div>
      <div className="button_surrounding">
        <IncreaseButton></IncreaseButton>
      </div>

      <div className="button_surrounding">
        <DeleteButton></DeleteButton>
      </div>
    </React.Fragment>
  );
}
