import React, {useContext} from "react";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { updateProduct } from "../services/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { APP_STATES, AWAITING_API_RESPONSE } from "./Dashboard";
import { ProductContext } from "../contexts/productContext";
import { AppContext } from "../contexts/appContext";
const DecreaseButton = ()=> {
  const session_code = localStorage.getItem("session_code");
  const productContext = useContext(ProductContext)
  const appContext = useContext(AppContext)
  const onClickHandler = () =>{
    const product_data = {
      id: productContext.product.product_id,
      updatedValues: {
        quantity: productContext.product.quantity - 1,
        name: productContext.product.name,
      },
    };
   //productContext.stateChanger({ app_state: APP_STATES.AWAITING_API_RESPONSE });
    const result = updateProduct(product_data, session_code);
    //this.props.server_response_service(this.props.state_changer, result);
    appContext.stateChanger({appState:APP_STATES.REFRESHING});

  }


    return (
      <button
        className="btn btn-primary btn-sm"
        disabled={appContext.appState !== APP_STATES.DEFAULT? true : false}
        onClick={() => {
          onClickHandler();
        }}
      >
        <BsFillArrowDownSquareFill />
      </button>
    );
  
}

export default DecreaseButton;
