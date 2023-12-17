import React from "react";
import { updateProduct } from "../../services/store";

import ResourceDescription from "../commonComponents/ResourceDescription.js";
import ProductButtons from "./ProductButtons";
import "../ResourceComponent.css";

function ProductComponent() {
  return (
    <div className="product__properties">
      <ResourceDescription updateMethod={updateProduct}></ResourceDescription>
      <ProductButtons></ProductButtons>
    </div>
  );
}

export default ProductComponent;
