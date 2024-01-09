import React from "react";
import ProductComponent from "./ProductComponent";
import { ResourceContext } from "../../contexts/resourceContext";
import { ScrollableList } from "../commonComponents/ScrollableList";
import SwipeRightProvider from "../../contexts/SwipeRight";
import "../ResourceComponent.css";

const ProductList = (props) => {
  return (
    <ScrollableList>
      {props.productList.map((product) => (
        <SwipeRightProvider key={product.product_id}>
          <ResourceContext.Provider
            value={{
              resource: product,
              modifyProductInState: props.modifyProductInState,
              deleteResourceFromState: props.deleteResourceFromState,
            }}
          >
            <ProductComponent></ProductComponent>
          </ResourceContext.Provider>
        </SwipeRightProvider>
      ))}
    </ScrollableList>
  );
};

export default ProductList;
