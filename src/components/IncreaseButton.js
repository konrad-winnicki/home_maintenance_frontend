import React, { useContext } from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { updateProduct } from "../services/store";
import { APP_STATES } from "./NavigationBar";
import { SourceContext } from "../contexts/sourceContext";
import { AppContext } from "../contexts/appContext";
const IncreaseButton = () => {
  const session_code = localStorage.getItem("session_code");
  const productContext = useContext(SourceContext);
  const appContext = useContext(AppContext);

  const onClickHandler = () => {
    const product_data = {
      id: productContext.source.product_id,
      updatedValues: {
        quantity: productContext.source.quantity + 1,
        name: productContext.source.name,
      },
    };
    console.log(product_data.updatedValues);
    appContext.stateChanger({appState:APP_STATES.AWAITING_API_RESPONSE});
    updateProduct(product_data, session_code).then(()=>{
      appContext.stateChanger({ appState: APP_STATES.REFRESHING });
    }).catch((error) => console.log(error));

  };

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
  );
};

export default IncreaseButton;
