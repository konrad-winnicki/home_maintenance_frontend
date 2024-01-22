import { backendUrl } from "../config";
const barcodeEndpoint = backendUrl + `homes/`;

export async function modifyProductListWithBarcode(
  barcode_data,
  homeId,
  authorization_code
) {
  return fetch(barcodeEndpoint + `${homeId}/store/modify_store`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
    body: JSON.stringify(barcode_data),
  });
}

export async function modifyShoppingListWithBarcode(
  barcode_data,
  homeId,
  authorization_code
) {
  return fetch(barcodeEndpoint + `${homeId}/cart/modify_cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
    body: JSON.stringify(barcode_data),
  });
}

export async function addBarcode(barcode_data, homeId, authorization_code) {
  return fetch(barcodeEndpoint + `${homeId}/barcodes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
    body: JSON.stringify(barcode_data),
  });
}
