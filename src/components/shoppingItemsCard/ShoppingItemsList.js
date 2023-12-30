import React from "react";
import { ResourceContext } from "../../contexts/resourceContext";
import ShoppingItemComponent from "./ShoppingItemComponent";
import AddItemToShoppings from "./AddItemToShoppings";

const ShoppingItemsList = (props) => {
  console.log("shoping item list", props.shoppingItemsList);
  return (
    <React.Fragment>
      <div
        className="flex-grow-1 mt-1"
        style={{
          overflow: "auto",
          paddingBottom: "1%",
          marginBottom: "14%",
        }}
      >
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
        <div className="row my-5 mx-0 sticky-top">
          <AddItemToShoppings></AddItemToShoppings>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShoppingItemsList;
