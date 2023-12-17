import React from "react";
import DeleteButton from "../commonComponents/DeleteButton";
import CheckBox from "./Checkbox.js";
import "../ResourceButtons.css";
import { deleteShoppingItem } from "../../services/cart";
export default function ShopingItemButtons() {
  return (
    <React.Fragment>
        <CheckBox></CheckBox>
        <DeleteButton deleteMethod={deleteShoppingItem}></DeleteButton>
    </React.Fragment>
  );
}
