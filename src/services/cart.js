import { backendUrl } from "../config";
const shoppingItemsEndpoint = backendUrl + "homes/";

export function addShoppingItem(shoppingItem, homeId, authorization_code) {
  return fetch(shoppingItemsEndpoint + `${homeId}/cart/items`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
    body: JSON.stringify(shoppingItem),
  })
    
}

export function getShoppingItems(homeId, authorization_code) {
  return fetch(shoppingItemsEndpoint + `${homeId}/cart/items`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "GET",
  })
}

export function updateShoppingItem(product_data, homeId, authorization_code) {
  const endpointUrl = shoppingItemsEndpoint +`${homeId}/cart/items/${product_data.id}` ;
  return fetch(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "PUT",
    body: JSON.stringify(product_data.updatedValues),
  });
}

export function deleteShoppingItem(shoppingItemId, homeId, authorization_code) {
  const endpointUrl = shoppingItemsEndpoint + `${homeId}/cart/items/${shoppingItemId}`;
  return fetch(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "DELETE",
  });
}

export function addFinishedProductsToShoppingList(homeId, authorization_code) {
  return fetch(shoppingItemsEndpoint + `${homeId}/cart/items/shoppinglist`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
  })
    
}
