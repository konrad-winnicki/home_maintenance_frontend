import React from "react";
import { SourceContext } from "../../contexts/sourceContext";
import ShoppingItemComponent from "./ShoppingItemComponent";

const ShoppingItemsList = (props) => {
  return (
    <div>
      {props.shoppingItemsList.map((shoppingItem) => (
        <SourceContext.Provider
          key={shoppingItem.product_id}
          value={{
            source: shoppingItem,
          }}
        >
          <ShoppingItemComponent></ShoppingItemComponent>
        </SourceContext.Provider>
      ))}
    </div>
  );
};

export default ShoppingItemsList;
