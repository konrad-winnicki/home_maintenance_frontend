import  { useContext, useEffect } from "react";
import { AppContext } from "../contexts/appContext.js";
import { APP_STATES } from "../applicationStates.js";
import { HomeContext } from "../contexts/homeContext.js";
import "../components/commonComponents/BottomNavbarButtons.css";
import { addBarcode, addShoppingItemByBarcode} from "../services/scaner.js";
import {
  serverResponseTranslator,
  ask_product_name,
} from "../services/auxilaryFunctions.js";
// export const url = "https://localhost:5000/products/";
export const url = "https://backend.home-maintenance.click/";

export const ShoppingScanerActions = (props) => {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;

  function modifyShoppingListByBarcode() {
    const session_code = localStorage.getItem("session_code");
    const response = addShoppingItemByBarcode(
      { barcode: props.barcode },
      homeId,
      session_code
    );
    const messages = {
      unknown: "Unknown error",
    };
    return serverResponseTranslator(messages, response);
  }

  function addBarcodeToDB() {
    const session_code = localStorage.getItem("session_code");
    let product_name = ask_product_name();
    let barcode_data = {
      name: product_name,
      barcode: props.barcode,
    };
    if (!product_name) {
      return;
    }

    const response = addBarcode(barcode_data, homeId, session_code);
    console.log(response)
    const messages = {
      success:
        "Barcode added.\n\nYou can use scaner to add and modificate products.",
      duplicated: "Name is assignated to other barcode",
      unknown: "Unknown error",
    };
    return serverResponseTranslator(messages, response);
  }

  

  useEffect( () => {
    console.log('ACTION')
    if (props.barcode) {
      modifyShoppingListByBarcode()
        .catch((error) => {
          if (error === "ItemNotExists") {
            return addBarcodeToDB();
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          console.log("finaly");
          props.setIsScanning(false);
          props.set_code(null);
          appContext.setAppState(APP_STATES.DEFAULT);
        });
    }
    //appContext.setAppState(APP_STATES.DEFAULT);
  },[props.barcode] );
  return null

};
