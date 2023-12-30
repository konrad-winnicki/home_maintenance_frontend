import React from "react";
import ProductComponent from "./ProductComponent";
import { ResourceContext } from "../../contexts/resourceContext";


const ProductList = (props) => {
  return (
    <div className="flex-grow-1 mt-1 mb-20" flex-grow-1 style={{
      overflow: "auto",
      paddingBottom: "1%",
      marginBottom: "1%",
    }}>
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
