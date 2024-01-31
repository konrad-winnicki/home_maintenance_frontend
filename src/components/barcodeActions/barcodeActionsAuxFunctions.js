import { addBarcode } from "../../services/scaner.js";
import {
  errorHandler,
  notificator,
} from "../../services/auxilaryFunctions.js";
import { serverResponseResolver } from "../../services/auxilaryFunctions.js";

export async function addBarcodeToDB(barcode, name, category, homeId) {
  const session_code = localStorage.getItem("session_code");
  let barcode_data = {
    category: category,
    name: name,
    barcode: barcode,
  };

  const notificatorMessages = {
    success:
      "Barcode added.\n\nYou can use scaner to add and modificate products.",
    duplicated: "Name is assignated to other barcode",
    unknown: "Unknown error",
  };

  addBarcode(barcode_data, homeId, session_code)
    .then((response) => {
      return serverResponseResolver(response).then((result) => {
        const actions = {201: ()=>{notificator(result.statusCode, notificatorMessages)} }
        errorHandler(result.statusCode, actions)
      });
    })
    .catch((error) => {
      console.log(error);
      notificator(500, notificatorMessages);
    });
}
