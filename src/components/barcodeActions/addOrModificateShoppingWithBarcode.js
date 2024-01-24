import { modifyShoppingListWithBarcode } from "../../services/scaner";
import {
  serverResponseResolver,
  notificator,
  errorHandler,
} from "../../services/auxilaryFunctions";
import { logOut } from "../../services/loginAuxilaryFunctions";

export const addOrModificateShoppingItem = (barcode, homeId) => {
  const session_code = localStorage.getItem("session_code");
  const notificatorMessages = {
    unknown: "Unknown error",
  };

  return modifyShoppingListWithBarcode(
    { barcode: barcode },
    homeId,
    session_code
  )
    .then((response) => {
      return serverResponseResolver(response).then((result) => {
        const body = result.body;
        const statusCode = result.statusCode;
        const actions = {
          200: () => {
            actionIfBarcodeExists(statusCode, body);
          },
          401: () => {
            logOut();
          },
        };
        errorHandler(result.statusCode, actions);
      });
    })
    .catch((error) => {
      if (error.message === "404") {
        return Promise.reject(404);
      } else {
        console.log(error);
      }
      notificator(500, notificatorMessages);
    });
};

const actionIfBarcodeExists = (statusCode, body) => {
  if (body.response === "updated") {
    const notificatorMessages = {
      success: `${body.name} has been checked out`,
    };
    notificator(statusCode, notificatorMessages);
  } else if (body.response === "added") {
    const notificatorMessages = {
      success: `${body.name} has been added`,
    };
    notificator(statusCode, notificatorMessages);
  }
};
