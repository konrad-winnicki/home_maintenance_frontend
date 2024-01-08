import React, {useState} from "react";
import ResourceDescription from "../commonComponents/ResourceDescription.js";
import "../ResourceComponent.css";
import ShopingItemButtons from "./ShoppingItemButtons.js";
import { updateShoppingItem } from "../../services/cart.js";

function ShoppingItemComponent() {
  const [showButtons, setShowButtons] = useState(false)


  return (
    <div className="product__properties">
      <ResourceDescription
          setShowButtons={setShowButtons}

        updateMethod={updateShoppingItem}
      ></ResourceDescription>
      <ShopingItemButtons></ShopingItemButtons>
    </div>
  );
}

export default ShoppingItemComponent;
