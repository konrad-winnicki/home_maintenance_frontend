import React from "react";

import SourceDescription from "../commonComponents/SourceDescription.js";
import "../SourceComponent.css";
import ShopingItemButtons from "./ShoppingItemButtons.js";
import { updateShoppingItem } from "../../services/cart.js";
function ShoppingItemComponent() {
  return (
    <div className="product__properties">
      <SourceDescription updateMethod={updateShoppingItem}></SourceDescription>
      <ShopingItemButtons></ShopingItemButtons>
    </div>
  );
}

export default ShoppingItemComponent;
