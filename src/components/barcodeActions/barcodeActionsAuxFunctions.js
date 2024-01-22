import {
  addBarcode,
  modifyShoppingListWithBarcode,
  modifyProductListWithBarcode,
} from "../../services/scaner.js";
import {
  ask_product_name,
  notificator,
} from "../../services/auxilaryFunctions.js";
import { serverResponseResolver } from "../../services/auxilaryFunctions.js";

export async function adOrModifyShoppingItemWithBarcode(barcode, homeId) {
  const session_code = localStorage.getItem("session_code");
  return modifyShoppingListWithBarcode(
    { barcode: barcode },
    homeId,
    session_code
  )
    .then((response) => {
      return serverResponseResolver(response);
    })
    .catch((error) => {
      console.log(error);
      const notificatorMessages = {
        unknown: "Unknown error",
      };
      notificator(500, notificatorMessages);
    });
}

export async function addOrModifyProductWithBarcode(barcode, homeId) {
  const session_code = localStorage.getItem("session_code");
  return modifyProductListWithBarcode(
    { barcode: barcode },
    homeId,
    session_code
  )
    .then((response) => {
      return serverResponseResolver(response);
    })
    .catch((error) => {
      console.log(error);
      const notificatorMessages = {
        unknown: "Unknown error",
      };
      notificator(500, notificatorMessages);
    });
}

export async function addBarcodeToDB(barcode, homeId) {
  const session_code = localStorage.getItem("session_code");
  let product_name = ask_product_name();
  let barcode_data = {
    name: product_name,
    barcode: barcode,
  };
  if (!product_name) {
    return;
  }
  return addBarcode(barcode_data, homeId, session_code)
    .then((response) => {
      return serverResponseResolver(response).then((result) => {
        const notificatorMessages = {
          success:
            "Barcode added.\n\nYou can use scaner to add and modificate products.",
          duplicated: "Name is assignated to other barcode",
          unknown: "Unknown error",
        };
        notificator(result.statusCode, notificatorMessages);
      });
    })
    .catch((error) => {
      console.log(error);
      const notificatorMessages = {
        unknown: "Unknown error",
      };
      notificator(500, notificatorMessages);
    });
}
