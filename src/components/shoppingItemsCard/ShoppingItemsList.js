import React from "react";
import { ResourceContext } from "../../contexts/ResourceContext";
import ShoppingItemComponent from "./ShoppingItemComponent";

const ShoppingItemsList = (props) => {
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
