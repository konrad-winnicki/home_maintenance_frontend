import { fetch_function } from "../functions";

//const url = "https://localhost:5000/";
const url = "https://backend.home-maintenance.click/"
const add_item_to_shoppings_endpoint = "cart/items/";
const add_finished_product_to_shoppings_endpoint = "cart/items/shoppinglist";
const delete_from_cart_endpoint = "cart/items/";
const change_item_prop_in_cart_endpoint = "cart/items/";

export function add_item_to_shopping_list(product_data, authorization_code) {
  return fetch_function(
    add_item_to_shoppings_endpoint,
    "POST",
    product_data,
    authorization_code
  );
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

export function change_product_properties_in_cart(
  product_data,
  authorization_code
) {
  return fetch_function(
    change_item_prop_in_cart_endpoint,
    "PUT",
    product_data,
    authorization_code
  );
}

export function delete_item_from_cart(product_data, authorization_code) {
  return fetch_function(
    delete_from_cart_endpoint,
    "DELETE",
    product_data,
    authorization_code
  );
}

export function list_of_checked_out_items(product_list) {
  let checkout_shopping_list = [];
  let shopping_list = product_list;
  for (let i = 0; i < shopping_list.length; i++) {
    if (shopping_list[i].checkout == true) {
      checkout_shopping_list.push(shopping_list[i]);
    }
  }
  return checkout_shopping_list;
}

export function add_finished_products_to_shopping_list(
  product_data,
  authorization_code
) {
  return fetch_function(
    add_finished_product_to_shoppings_endpoint,
    "POST",
    product_data,
    authorization_code
  );
}
