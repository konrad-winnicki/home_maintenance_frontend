import React from "react";
import DeleteButton from "./DeleteButton";
import CheckBox from "./Checkbox.js";
import "./ProductButtons.css";
import { deleteShoppingItem } from "../services/cart";
export default function ShopingItemButtons() {
  return (
    <React.Fragment>
      <div className="button_surrounding">
        <CheckBox></CheckBox>
      </div>
      <div className="button_surrounding">
        <DeleteButton deleteMethod={deleteShoppingItem}></DeleteButton>
      </div>
    </React.Fragment>
  );
}
