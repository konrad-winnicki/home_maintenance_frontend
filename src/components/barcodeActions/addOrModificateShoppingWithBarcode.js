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

  return modifyShoppingListWithBarcode({ barcode: barcode }, homeId, session_code)
    .then((response) => {
      return serverResponseResolver(response).then((result) => {
        const body = result.body;
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
      const statusCode = error.statusCode? error.statusCode : 500
      if (error.statusCode === 404) {
          return Promise.reject(404)
      } else {
        console.log(error);
      }
      notificator(statusCode, notificatorMessages);
    });

 
};
