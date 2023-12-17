import React from "react";
import DeleteButton from "./DeleteButton";
import IncreaseButton from "./IncreaseButton.js";
import DecreaseButton from "./DecreaseButton.js";
import "./ProductButtons.css";
import { deleteProduct } from "../services/store";

export default function ProductButtons() {
  return (
    <React.Fragment>
      <div className="button_surrounding">
        <DecreaseButton></DecreaseButton>
      </div>
      <div className="button_surrounding">
        <IncreaseButton></IncreaseButton>
      </div>

      <div className="button_surrounding">
        <DeleteButton deleteMethod={deleteProduct}></DeleteButton>
      </div>
    </React.Fragment>
  );
}
