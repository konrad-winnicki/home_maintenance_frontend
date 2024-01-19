import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/appContext.js";
import { APP_STATES } from "../applicationStates.js";
import { HomeContext } from "../contexts/homeContext.js";
import "../components/commonComponents/BottomNavbarButtons.css";
import { addBarcode, addProductByBarcode } from "../services/scaner.js";
import {
  serverResponseTranslator,
  ask_product_name,
} from "../services/auxilaryFunctions.js";
// export const url = "https://localhost:5000/products/";
export const url = "https://backend.home-maintenance.click/";

export const ProductScanerActions = (props) => {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;

  function modifyStoreByBarcode() {
    const session_code = localStorage.getItem("session_code");
    const response = addProductByBarcode(
      { barcode: props.barcode },
      homeId,
      session_code
    );
    const messages = {
      duplicated: "Product already exists",
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
    const messages = {
      success:
        "Barcode added.\n\nYou can use scaner to add and modificate products.",
      duplicated: "Name is assignated to other barcode",
      unknown: "Unknown error",
    };
    return serverResponseTranslator(messages, response);
  }

  function modifyProductState(body) {
    if (body.response === "updated") {
      const newValues = {
        product_id: body.productId,
        name: body.name,
        quantity: body.quantity,
      };
      props.modifyProductInState(newValues);
    }

    if (body.response === "added") {
      props.addProductToState({
        product_id: body.productId,
        name: body.name,
        quantity: body.quantity,
      });
    }
  }

  useEffect(() => {
    if (props.barcode) {
      modifyStoreByBarcode()
        .then((result) => {
          const body = result.body;
          modifyProductState(body);
        })
        .catch((error) => {
          if (error === "ItemNotExists") {
            addBarcodeToDB();
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
  }, [props.barcode]);
};
