import React, { useContext } from "react";
import { SiAddthis } from "react-icons/si";
import {
  actionTaker,
  ask_product_name,
  notificator,
  serverResponseResolver,
} from "../../services/auxilaryFunctions";
import { addProduct } from "../../services/store";
import { APP_STATES } from "../../applicationStates";
import {
  extractIdFromLocation,
} from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { HomeContext } from "../../contexts/homeContext";
import "../commonComponents/BottomNavbarButtons.css";

const AddProductButton = (props) => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;
  const onClickHandler = async () => {
    let product_name = ask_product_name();
    let product_data = {
      name: product_name,
      quantity: 1,
    };
    if (!product_name) {
      return;
    }
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    
    const notificatorMessages = {
      success: "Product addded",
      duplicated: "Product already exists",
      unknown: "Unknown error",
    };

    addProduct(product_data, homeId, session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          actionTaker(result.statusCode, () => {
            const id = extractIdFromLocation(result.location);
            props.addProductToState({
              product_id: id,
              name: product_data.name,
              quantity: product_data.quantity,
            });
          });
          notificator(result.statusCode, notificatorMessages);
        });
      })
      .catch((error) => {
        if (error.statusCode) {
          notificator(error.statusCode, notificatorMessages);
        } else {
          console.log(error);
        }
      });

    appContext.setAppState(APP_STATES.DEFAULT);
  };

  return (
    <div className="col text-center ">
      <button
        className="bottom_navbar_buttons"
        disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
        onClick={() => onClickHandler()}
      >
        <SiAddthis /> product
      </button>
    </div>
  );
};

export default AddProductButton;
