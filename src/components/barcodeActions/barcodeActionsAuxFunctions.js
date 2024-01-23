import {
  addBarcode,
} from "../../services/scaner.js";
import {
  ask_product_name,
  notificator,
} from "../../services/auxilaryFunctions.js";
import { serverResponseResolver } from "../../services/auxilaryFunctions.js";



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
  const notificatorMessages = {
    success:
      "Barcode added.\n\nYou can use scaner to add and modificate products.",
    duplicated: "Name is assignated to other barcode",
    unknown: "Unknown error",
  };

  addBarcode(barcode_data, homeId, session_code)
    .then((response) => {
      return serverResponseResolver(response).then((result) => {
        
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
}
