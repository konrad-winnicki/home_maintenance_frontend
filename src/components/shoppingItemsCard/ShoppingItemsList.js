import React from "react";
import { ResourceContext } from "../../contexts/resourceContext";
import ShoppingItemComponent from "./ShoppingItemComponent";
import { ScrollableList } from "../commonComponents/ScrollableList";
import SwipeRightProvider from "../../contexts/SwipeRight";

const ShoppingItemsList = (props) => {
  return (
    <ScrollableList>
      {props.shoppingItems.map((shoppingItem) => (
        <div key={shoppingItem.product_id}>
        <SwipeRightProvider>
          <ResourceContext.Provider
            key={shoppingItem.product_id}
            value={{
              resource: shoppingItem,
            }}
          >
            <ShoppingItemComponent></ShoppingItemComponent>
          </ResourceContext.Provider>
        </SwipeRightProvider>
        </div>
      ))}
    </ScrollableList>
  );
};

export default ShoppingItemsList;
