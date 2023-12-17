import React from "react";
import ResourceDescription from "../commonComponents/ResourceDescription.js";
import "../ResourceComponent.css";
import ShopingItemButtons from "./ShoppingItemButtons.js";
import { updateShoppingItem } from "../../services/cart.js";

function ShoppingItemComponent() {
  return (
    <div className="product__properties">
      <ResourceDescription
        updateMethod={updateShoppingItem}
      ></ResourceDescription>
      <ShopingItemButtons></ShopingItemButtons>
    </div>
  );
}

export default ShoppingItemComponent;
