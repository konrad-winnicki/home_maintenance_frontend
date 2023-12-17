const backendUrl = "http://localhost:5000/";

//const url = "https://backend.home-maintenance.click/"
const addFinishedProductsEndpoint = backendUrl + "cart/items/shoppinglist";
const shoppingItemsEndpoint = backendUrl + "cart/items/";

export function addShoppingItem(shoppingItem, authorization_code) {
  return fetch(shoppingItemsEndpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
    body: JSON.stringify(shoppingItem),
  })
    
}

export function getShoppingItems(authorization_code) {
  return fetch(shoppingItemsEndpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "GET",
  })
}

export function updateShoppingItem(product_data, authorization_code) {
  const endpointUrl = shoppingItemsEndpoint + product_data.id;
  return fetch(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "PUT",
    body: JSON.stringify(product_data.updatedValues),
  });
}

export function deleteShoppingItem(shoppingItemId, authorization_code) {
  const endpointUrl = shoppingItemsEndpoint + shoppingItemId;
  return fetch(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "DELETE",
  });
}

export function addFinishedProductsToShoppingList(authorization_code) {
  let promise = fetch(addFinishedProductsEndpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
      return "Error";
    });
  return promise;
}
