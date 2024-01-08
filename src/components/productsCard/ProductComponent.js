import React, { useState } from "react";
import { updateProduct } from "../../services/store";

import ResourceDescription from "../commonComponents/ResourceDescription.js";
import ProductButtons from "./ProductButtons";
import "../ResourceComponent.css";

function ProductComponent() {
  const [showButtons, setShowButtons] = useState(false)

  return (
    <div className="product__properties"
    >
      <ResourceDescription
      setShowButtons={setShowButtons}
      showButtons={showButtons}
      updateMethod={updateProduct}></ResourceDescription>
      {showButtons? <ProductButtons></ProductButtons>:""}
    </div>
  );
}

export default ProductComponent;
