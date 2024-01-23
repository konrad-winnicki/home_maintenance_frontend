import { notificator, serverResponseResolver } from "../../services/auxilaryFunctions";
import {
  addBarcodeToDB,
} from "./barcodeActionsAuxFunctions";

import { modifyProductListWithBarcode } from "../../services/scaner";
export const adOrModificateProduct = (
  addProductToState,
  modifyProductInState
) => {

  const notificatorMessages = {
    unknown: "Unknown error",
  };
  return async (barcode, homeId) =>{
    const session_code = localStorage.getItem("session_code");
    modifyProductListWithBarcode(
      { barcode: barcode },
      homeId,
      session_code
    )
    .then((response) => {
      return serverResponseResolver(response).then((result) => {
        const body = result.body
        const newValues = {
          product_id: body.productId,
          name: body.name,
          quantity: body.quantity,
        }
        
        if (body.response === "updated") {
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
      })

    })
    .catch((error) => {
      console.log('ffff', error)
      if (error.statusCode) {
        if(error.statusCode === 404){
          return addBarcodeToDB(barcode, homeId)
        }
        notificator(error.statusCode, notificatorMessages);
      } else {
        console.log(error);
      }
    });

  }
  }
