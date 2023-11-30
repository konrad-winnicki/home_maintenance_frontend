import { fetch_function } from "../functions";
const url = "http://localhost:5000/";
//const url = "https://backend.home-maintenance.click/"
const add_product_endpoint = "store/products/";
const add_shoppings_to_store_endpoint = "store/products/delivery/";
const delete_from_store_endpoint = "store/products/";
const change_product_prop_in_store_endpoint = "store/products/";

export function add_shoppings_to_store(product_data, authorization_code) {
  return fetch_function(
    add_shoppings_to_store_endpoint,
    "POST",
    product_data,
    authorization_code
  );
}
export function add_product_to_store(product_data, authorization_code) {
  return fetch_function(
    add_product_endpoint,
    "POST",
    product_data,
    authorization_code
  );
}

export function delete_product_from_store(product_data, authorization_code) {
  return fetch_function(
    delete_from_store_endpoint,
    "DELETE",
    product_data,
    authorization_code
  );
}

export function change_product_properties_in_store(
  product_data,
  authorization_code
) {
  return fetch_function(
    change_product_prop_in_store_endpoint,
    "PUT",
    product_data,
    authorization_code
  );
}

export function get_products_from_store(authorization_code) {
  let promise = fetch(url + "store/products/", {
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
    .catch((error) => {
      console.log(error)
      return "Error";
    });
  return promise;
}

export function prepareListOfFinishedProducts(product_list) {
  let finished_products = [];
  for (let i = 0; i < product_list.length; i++) {
    if (product_list[i].quantity === 0) {
      finished_products.push(product_list[i]);
    }
  }
  return finished_products;
}
