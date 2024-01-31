import {
  errorHandler,
  notificator,
  serverResponseResolver,
} from "../../services/auxilaryFunctions";
import { logOut } from "../../services/loginAuxilaryFunctions";
import { modifyProductListWithBarcode } from "../../services/scaner";



export const adOrModificateProduct = (
  addProductToState,
  modifyProductInState
) => {
  const notificatorMessages = {
    unknown: "Unknown error",
  };
  return async (barcode, homeId) => {
    const session_code = localStorage.getItem("session_code");
    return modifyProductListWithBarcode(
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
              actionIfBarcodeExists(
                statusCode,
                body,
                modifyProductInState,
                addProductToState
              );
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
};

const actionIfBarcodeExists = (
  statusCode,
  body,
  modifyProductInState,
  addProductToState
) => {
  const newValues = {
    product_id: body.productId,
    name: body.name,
    category: body.category,
    quantity: body.quantity,
  };
  if (body.response === "updated") {
    const notificatorMessages = {
      success: `${body.name} has been increased`,
    };
    notificator(statusCode, notificatorMessages);
    modifyProductInState(newValues, body.category);
  } else if (body.response === "added") {
    const notificatorMessages = {
      success: `${body.name} has been added`,
    };
    notificator(statusCode, notificatorMessages);
    addProductToState(newValues, body.category);
  }
};
