import React from "react";
import ProductComponent from "./ProductComponent";
import { ProductContext } from "../contexts/productContext";

const ProductList = (props) => {
  return (
    <div>
      {props.productList.map((product) => (
        <ProductContext.Provider
          key={product.product_id}
          value={{
            product: product,
          }}
        >
          <ProductComponent></ProductComponent>
        </ProductContext.Provider>
      ))}
    </div>
  );
};

export default ProductList;
