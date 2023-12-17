import React from "react";
import ProductComponent from "./ProductComponent";
import { SourceContext } from "../../contexts/sourceContext";

const ProductList = (props) => {
  return (
    <div>
      {props.productList.map((product) => (
        <SourceContext.Provider
          key={product.product_id}
          value={{
            source: product,
          }}
        >
          <ProductComponent></ProductComponent>
        </SourceContext.Provider>
      ))}
    </div>
  );
};

export default ProductList;
