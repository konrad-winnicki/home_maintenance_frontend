import React from "react";
import { ResourceContext } from "../../contexts/resourceContext";
import ShoppingItemComponent from "./ShoppingItemComponent";
import { ScrollableList } from "../commonComponents/ScrollableList";
import SwipeRightProvider from "../../contexts/SwipeRight";

const ShoppingItemsList = (props) => {
  return (
    <ScrollableList>
      {props.shoppingItems.map((shoppingItem) => (
        <SwipeRightProvider key={shoppingItem.product_id} directionRestriction={'left'}>
          <ResourceContext.Provider
            value={{
              resource: shoppingItem,
              modifyProductInState: props.modifyProductInState,

            }}
          >
            <ShoppingItemComponent></ShoppingItemComponent>
          </ResourceContext.Provider>
        </SwipeRightProvider>
      ))}
    </ScrollableList>
  );
};

export default ShoppingItemsList;
