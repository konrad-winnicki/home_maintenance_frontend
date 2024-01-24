import { addBarcode } from "../../services/scaner.js";
import {
  notificator,
} from "../../services/auxilaryFunctions.js";
import { serverResponseResolver } from "../../services/auxilaryFunctions.js";

export async function addBarcodeToDB(barcode, name, homeId) {
  const session_code = localStorage.getItem("session_code");
  let barcode_data = {
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
        notificator(result.statusCode, notificatorMessages);
      });
    })
    .catch((error) => {
      const statusCode = error.statusCode ? error.statusCode : 500;
      console.log(error);
      notificator(statusCode, notificatorMessages);
    });
}
