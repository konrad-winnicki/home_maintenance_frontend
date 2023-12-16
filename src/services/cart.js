import { fetch_function } from "../functions";

const url = "http://localhost:5000/";
const backendUrl = "http://localhost:5000/";

//const url = "https://backend.home-maintenance.click/"
const add_item_to_shoppings_endpoint = "cart/items/";
const addFinishedProductsEndpoint = "cart/items/shoppinglist";
const delete_from_cart_endpoint = "cart/items/";
const shoppingItemEndpoint = backendUrl + "cart/items/";
const change_item_prop_in_cart_endpoint = "cart/items/";

export function addShoppingItem(shoppingItem, authorization_code) {
  return fetch(shoppingItemEndpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
    body: JSON.stringify(shoppingItem),
  })
    .then((response) => {
      if (response) {
        return response;
      } else {
        return Promise.reject("Product not added");
      }
    })

    .catch((error) => {
      console.log("Catched unknown error:", error);
    });
}



export function get_items_from_shoping_list(authorization_code) {
  let promise = fetch(url + "cart/items/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "GET",
  })
    .then((response) => {
      if (response.status === 401) {
        return 401;
      } else {
        console.log("res from function", response);
        return response;
      }
    })
    .catch(() => {
      return "Error";
    });
  return promise;
}

export function updateShoppingItem(product_data, authorization_code) {
  const endpointUrl = shoppingItemEndpoint + product_data.id;
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
  const endpointUrl = shoppingItemEndpoint + shoppingItemId;
  return fetch(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "DELETE",
  });
}

export function addFinishedProductsToShoppingList(authorization_code) {
  let promise = fetch(backendUrl + addFinishedProductsEndpoint, {
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
