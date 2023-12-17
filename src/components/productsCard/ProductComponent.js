import React from "react";
import { updateProduct } from "../../services/store";

import SourceDescription from "../commonComponents/SourceDescription.js";
import ProductButtons from "./ProductButtons";
import "../SourceComponent.css";

function ProductComponent() {
  return (
    <div className="product__properties">
      <SourceDescription updateMethod={updateProduct}></SourceDescription>
      <ProductButtons></ProductButtons>
    </div>
  );
}

export default ProductComponent;
