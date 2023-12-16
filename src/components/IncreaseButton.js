import React, {useContext} from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { updateProduct } from "../services/store";
import { APP_STATES} from "./Dashboard";
import { ProductContext } from "../contexts/productContext";
import { AppContext } from "../contexts/appContext";
const IncreaseButton = ()=> {
  const session_code = localStorage.getItem("session_code");
  const productContext = useContext(ProductContext)
  const appContext = useContext(AppContext)


  const onClickHandler = () => {
    const product_data = {
      id: productContext.product.product_id,
      updatedValues:{
      quantity: productContext.product.quantity + 1,
      name: productContext.product.name}
    };
    console.log(product_data.updatedValues)
    //appContext.stateChanger({appState:'APP_STATES.AWAITING_API_RESPONSE'});
    const result = updateProduct(product_data, session_code);
    appContext.stateChanger({appState:APP_STATES.REFRESHING});

    //this.props.server_response_service(this.props.state_changer, result);
  }


    return (
      <button
        className="btn btn-primary btn-sm"
        disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
        onClick={() => {
          onClickHandler();
        }}
      >
        <BsFillArrowUpSquareFill />
      </button>
    )
}

export default IncreaseButton;
