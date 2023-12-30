import React from "react";
import ProductComponent from "./ProductComponent";
import { ResourceContext } from "../../contexts/resourceContext";



/*
className="flex-grow-1 mt-1 mb-8"
    style={{
      overflow: "auto",
      paddingBottom: "1%",
      marginBottom: "14%",
    }}

    */

const ProductList = (props) => {
  return (
    <React.Fragment>
    <div className="flex-grow-1 mt-1 mb-8" flex-grow-1 style={{
      overflow: "auto",
      paddingBottom: "1%",
      marginBottom: "14%",
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
    </React.Fragment>
  );
};

export default ProductList;
