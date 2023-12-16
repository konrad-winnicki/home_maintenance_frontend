import React, { useContext } from "react";

import ProductDescription from "./ProductDescription.js";
import ProductButtons from "./ProductButtons";
import "./ProductComponent.css";
import { ProductContext } from "../contexts/productContext";

function ProductComponent(props) {
  return (
    <div className="product__properties">
      <ProductDescription></ProductDescription>
      <ProductButtons></ProductButtons>
    </div>
  );
}

export default ProductComponent;
