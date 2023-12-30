import React from "react";
import ProductComponent from "./ProductComponent";
import { ResourceContext } from "../../contexts/resourceContext";
import { ScrollableList } from "../commonComponents/ScrollableList";

const ProductList = (props) => {
  return (
    <ScrollableList>
      {props.productList.map((product) => (
        <ResourceContext.Provider
          key={product.product_id}
          value={{
            resource: product,
          }}
        >
          <ProductComponent></ProductComponent>
        </ResourceContext.Provider>
      ))}
    </ScrollableList>
  );
};

export default ProductList;
