import {
  adOrModifyShoppingItemWithBarcode,
  addBarcodeToDB,
} from "./barcodeActionsAuxFunctions";

export const addOrModificateShoppingItem = (barcode, homeId) => {
  adOrModifyShoppingItemWithBarcode(barcode, homeId)
    .then((result) => {
      if (result.statusCode === 404) {
        return Promise.reject("BarcodeNotExists");
      }
      return Promise.resolve("StateModified");
    })
    .catch((error) => {
      if (error === "BarcodeNotExists") {
        return addBarcodeToDB(barcode, homeId);
      }
    });
};
