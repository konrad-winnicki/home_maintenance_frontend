import React from "react";
import { ResourceContext } from "../../contexts/resourceContext";
import ShoppingItemComponent from "./ShoppingItemComponent";
import AddItemToShoppings from "./AddItemToShoppings";
import { ScrollableList } from "../commonComponents/ScrollableList";

const ShoppingItemsList = (props) => {
  return (
    <ScrollableList>
      {props.shoppingItems.map((shoppingItem) => (
        <ResourceContext.Provider
          key={shoppingItem.product_id}
          value={{
            resource: shoppingItem,
          }}
        >
          <ShoppingItemComponent></ShoppingItemComponent>
        </ResourceContext.Provider>
      ))}
      <div className="row my-5 mx-0 sticky-top">
        <AddItemToShoppings
        ></AddItemToShoppings>
      </div>
    </ScrollableList>
  );
};

export default ShoppingItemsList;
