import React from "react";
import { updateProduct } from "../services/store";

import SourceDescription from "./SourceDescription.js";
import ProductButtons from "./ProductButtons";
import "./ProductComponent.css";

function ProductComponent() {
  return (
    <div className="product__properties">
      <SourceDescription updateMethod={updateProduct}></SourceDescription>
      <ProductButtons></ProductButtons>
    </div>
  );
}

export default ProductComponent;
