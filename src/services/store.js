import { backendUrl } from "../config";
const productEndpoint = backendUrl + `homes/`;
//const addShoppingItemsToStoreEndpoint = backendUrl + "store/products/delivery/";

export function addShoppingItemsToStore(homeId, authorization_code) {
  return fetch(productEndpoint + `${homeId}/store/products/delivery`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
  })
}

export async function addProduct(product_data, homeId, authorization_code) {
  return fetch(productEndpoint + `${homeId}/store/products`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
    body: JSON.stringify(product_data),
  })
}

export function deleteProduct(productId, homeId, authorization_code) {
  const endpointUrl = productEndpoint + `${homeId}/store/products/${productId}`;
  return fetch(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "DELETE",
  });
}

export function updateProduct(product_data, homeId, authorization_code) {
  const endpointUrl = productEndpoint + `${homeId}/store/products/${product_data.id}`
  return fetch(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "PUT",
    body: JSON.stringify(product_data.updatedValues),
  });
}

export function getProducts(homeId, category, authorization_code) {
  return fetch(backendUrl + `homes/${homeId}/store/${category}/products`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "GET",
  })
   
}
