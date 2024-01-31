import React from "react";
import IncreaseButton from "./IncreaseButton.js";
import DecreaseButton from "./DecreaseButton.js";
import "../ResourceButtons.css";
import ChangeCategory from "./ChangeCategory.js";

export default function ProductButtons() {
  return (
    <React.Fragment>
      <ChangeCategory></ChangeCategory>
      <DecreaseButton></DecreaseButton>
      <IncreaseButton></IncreaseButton>
    </React.Fragment>
  );
}
