import React from "react";
import IncreaseButton from "./IncreaseButton.js";
import DecreaseButton from "./DecreaseButton.js";
import "../ResourceButtons.css";

export default function ProductButtons() {
  return (
    <React.Fragment>
        <DecreaseButton></DecreaseButton>
        <IncreaseButton></IncreaseButton>
    </React.Fragment>
  );
}
