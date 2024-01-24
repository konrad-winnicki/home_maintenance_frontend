import { notificator, serverResponseResolver } from "../../services/auxilaryFunctions";
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
    return modifyProductListWithBarcode(
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
      const statusCode = error.statusCode? error.statusCode : 500
      if (error.statusCode === 404) {
          return Promise.reject(404)
      } else {
        console.log(error);
      }
      notificator(statusCode, notificatorMessages);

    });

  }
  }
