import React, { useContext } from "react";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { updateProduct } from "../../services/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { APP_STATES } from "../commonComponents/NavigationBar";
import { SourceContext } from "../../contexts/sourceContext";
import { AppContext } from "../../contexts/appContext";
const DecreaseButton = () => {
  const session_code = localStorage.getItem("session_code");
  const productContext = useContext(SourceContext);
  const appContext = useContext(AppContext);
  const onClickHandler = () => {
    const product_data = {
      id: productContext.source.product_id,
      updatedValues: {
        quantity: productContext.source.quantity - 1,
        name: productContext.source.name,
      },
    };
    appContext.stateChanger({ app_state: APP_STATES.AWAITING_API_RESPONSE });
    updateProduct(product_data, session_code)
      .then(() => {
        appContext.stateChanger({ appState: APP_STATES.REFRESHING });
      })
      .catch((error) => console.log(error));
  };

  return (
    <button
      className="btn btn-primary btn-sm"
      disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
      onClick={() => {
        onClickHandler();
      }}
    >
      <BsFillArrowDownSquareFill />
    </button>
  );
};

export default DecreaseButton;
