import React from "react";
import ProductComponent from "./ProductComponent";
import { ResourceContext } from "../../contexts/ResourceContext";

const ProductList = (props) => {
  return (
    <div>
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
    </div>
  );
};

export default ProductList;
