import React, { useContext } from "react";
import { addFinishedProductsToShoppingList } from "../../services/cart";
import { serverResponseTranslator, serverResponseResolver, notificator } from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import { HomeContext } from "../../contexts/homeContext";
import "../commonComponents/BottomNavbarButtons.css";
import { TbTransferIn } from "react-icons/tb";

const AddFinishedProductsToCart = () => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;
  const addFinishedProductToShoppings = () => {
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    addFinishedProductsToShoppingList(homeId, session_code).then((response)=>{
      const notificatorMessages = {
        success: "Product added to cart",
        unknown: "Unknown error",
      };
      serverResponseResolver(response).then((result) => {
        notificator(result.statusCode, notificatorMessages);
      });
    })
    .catch((error) => console.log(error))
    .finally(() => {
      appContext.setAppState(APP_STATES.DEFAULT);
    });

    
     
  };

  return (
    <div className="col text-center ">
      <button
        className="bottom_navbar_buttons"
        disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
        onClick={() => {
          addFinishedProductToShoppings();
        }}
      >
        <TbTransferIn /> missing
      </button>
    </div>
  );
};

export default AddFinishedProductsToCart;
