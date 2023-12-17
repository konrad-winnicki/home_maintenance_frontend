import React from "react";
import DeleteButton from "../commonComponents/DeleteButton";
import IncreaseButton from "./IncreaseButton.js";
import DecreaseButton from "./DecreaseButton.js";
import "../ResourceButtons.css";
import { deleteProduct } from "../../services/store";

export default function ProductButtons() {
  return (
    <React.Fragment>
        <DecreaseButton></DecreaseButton>
        <IncreaseButton></IncreaseButton>
        <DeleteButton deleteMethod={deleteProduct}></DeleteButton>
    </React.Fragment>
  );
}
