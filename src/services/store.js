import { backendUrl } from "../config";
const productEndpoint = backendUrl + "store/products/";
const addShoppingItemsToStoreEndpoint = backendUrl + "store/products/delivery/";

export function addShoppingItemsToStore(authorization_code) {
  return fetch(addShoppingItemsToStoreEndpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
  })
}

export async function addProduct(product_data, authorization_code) {
  return fetch(productEndpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
    body: JSON.stringify(product_data),
  })
}

export function deleteProduct(productId, authorization_code) {
  const endpointUrl = productEndpoint + productId;
  return fetch(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "DELETE",
  });
}

export function updateProduct(product_data, authorization_code) {
  const endpointUrl = productEndpoint + product_data.id;
  return fetch(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "PUT",
    body: JSON.stringify(product_data.updatedValues),
  });
}

export function getProducts(authorization_code) {
  return fetch(backendUrl + "store/products/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "GET",
  })
   
}
