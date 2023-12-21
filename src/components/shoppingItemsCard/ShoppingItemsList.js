import React from "react";
import { ResourceContext } from "../../contexts/resourceContext";
import ShoppingItemComponent from "./ShoppingItemComponent";

const ShoppingItemsList = (props) => {
  console.log("shoping item list", props.shoppingItemsList);
  return (
    <div>
      {props.shoppingItemsList.map((shoppingItem) => (
        <ResourceContext.Provider
          key={shoppingItem.product_id}
          value={{
            resource: shoppingItem,
          }}
        >
          <ShoppingItemComponent></ShoppingItemComponent>
        </ResourceContext.Provider>
      ))}
    </div>
  );
};

export default ShoppingItemsList;
