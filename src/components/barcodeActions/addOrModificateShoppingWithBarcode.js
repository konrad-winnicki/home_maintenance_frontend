import {
  addBarcodeToDB,
} from "./barcodeActionsAuxFunctions";
import { modifyShoppingListWithBarcode } from "../../services/scaner";
import {
  serverResponseResolver,
  notificator,
} from "../../services/auxilaryFunctions";

export const addOrModificateShoppingItem = (barcode, homeId) => {
  const session_code = localStorage.getItem("session_code");
  const notificatorMessages = {
    unknown: "Unknown error",
  };

  modifyShoppingListWithBarcode({ barcode: barcode }, homeId, session_code)
    .then((response) => {
      return serverResponseResolver(response).then((result) => {
        const body = result.body;
        console.log('ffffff', result)
        if (body.response === "updated") {
          const notificatorMessages = {
            success: `${body.name} has been checked out`,
          };
          notificator(result.statusCode, notificatorMessages);
        } else if (body.response === "added") {
          const notificatorMessages = {
            success: `${body.name} has been added`,
          };
          notificator(result.statusCode, notificatorMessages);
        }
      });
    })
    .catch((error) => {
      console.log("ffff", error);
      if (error.statusCode) {
        if (error.statusCode === 404) {
          return addBarcodeToDB(barcode, homeId);
        }
        notificator(error.statusCode, notificatorMessages);
      } else {
        console.log(error);
      }
    });

 
};
