import { notificator } from "../../services/auxilaryFunctions";
import {
  addOrModifyProductWithBarcode,
  addBarcodeToDB,
} from "./barcodeActionsAuxFunctions";
export const adOrModificateProduct = (
  addProductToState,
  modifyProductInState
) => {
  return async (barcode, homeId) =>
    addOrModifyProductWithBarcode(barcode, homeId)
      .then((result) => {
        const body = result.body;
        const newValues = {
          product_id: body.productId,
          name: body.name,
          quantity: body.quantity,
        };
        if (result.statusCode === 404) {
          return Promise.reject("BarcodeNotExists");
        } else if (body.response === "updated") {
          const notificatorMessages = {
            success: `${body.name} has been increased`,
          };
          modifyProductInState(newValues);
          notificator(result.statusCode, notificatorMessages);
        } else if (body.response === "added") {
          const notificatorMessages = {
            success: `${body.name} has been added`,
          };
          addProductToState(newValues);
          notificator(result.statusCode, notificatorMessages);
        }
        return Promise.resolve("StateModified");
      })
      .catch((error) => {
        if (error === "BarcodeNotExists") {
          return addBarcodeToDB(barcode, homeId);
        }
      });
};
