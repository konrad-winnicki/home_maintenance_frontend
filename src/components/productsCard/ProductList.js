import React, { useEffect, useState } from "react";
import ProductComponent from "./ProductComponent";
import { ResourceContext } from "../../contexts/resourceContext";
import { ScrollableList } from "../commonComponents/ScrollableList";
import SwipeRightProvider from "../../contexts/SwipeRight";
import "../ResourceComponent.css";

const ProductList = (props) => {
  const [productButtonClicked, setClicked]= useState(null)  
  useEffect(()=>{
    console.log('render list', productButtonClicked)
    setClicked(false)
  },[
 
  ])
  return (
    <>
    <ScrollableList>
      {props.productList.map((product) => (
     
          <SwipeRightProvider style={{zIndex:1}} key={product.product_id} swipeRText={'ADD TO SHOPPINGS'}>
          
            <ResourceContext.Provider
              value={{
                resource: product,
                modifyProductInState: props.modifyProductInState,
                deleteResourceFromState: props.deleteResourceFromState,
                addResourceToState: props.addResourceToState,
              }}
            >
              <ProductComponent productButtonClicked={productButtonClicked} setClicked={setClicked}></ProductComponent>
            </ResourceContext.Provider>
          </SwipeRightProvider>
        
      ))}
    </ScrollableList>
    </>
  );
};

export default ProductList;
