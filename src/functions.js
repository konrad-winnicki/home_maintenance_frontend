import { toast } from "react-toastify";
//const url = "https://backend.home-maintenance.click/";
const url = "http://localhost:5000/";
export function askQuantity(string = "") {
  //let string = string
  let quantity = prompt("Quantity" + string, "");
  if (quantity === null || quantity === "") {
    return null;
  }
  if (isNaN(quantity)) {
    quantity = askQuantity((string = " must be a number!"));
    return Math.abs(quantity);
  } else {
    return Number(Math.abs(quantity));
  }
}

export function ask_product_name() {
  let product = prompt("Product name");

  if (product === "" || product == null) {
    return null;
  } else {
    return product;
  }
}

export function ask_new_name() {
  let new_name_from_user = prompt("Type NEW name?", "");
  if (new_name_from_user == "" || new_name_from_user == null) {
    return null;
  } else {
    return new_name_from_user;
  }
}

export function custom_quantity() {
  let new_value_from_user = askQuantity("");
  if (new_value_from_user == null) {
    return null;
  }
  return new_value_from_user;
}

/*
export function inner_server_response_to_state(result, state_changer_function) {
  result.then((result) => {
    state_changer_function({
      status_code: result[0],
      message_from_server: result[1],
    });
  });
}
*/
function notifications(message, type) {
  console.log("dodalem notification o typie " + type);
  if (type === "success") {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
    });
  }
  if (type === "warning") {
    console.log("show notification warning");
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  if (type === "error") {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export function state_changer_to_server_response(
  state_changer_function,
  response_from_server
) {
  response_from_server.then((response) => {
    let status_code = response[0];
    let server_message = response[1];
    if (status_code === 401) {
      state_changer_function({ app_state: "unlogged" });
    } else if (status_code > 199 && status_code < 300) {
      notifications(server_message, "success");
      state_changer_function({ app_state: "refreshing" });
    } else if (status_code === 409) {
      notifications(server_message, "warning");
      state_changer_function({ app_state: "default" });
    } else {
      notifications(server_message, "error");
      state_changer_function({ app_state: "default" });
    }
  });
}

export function state_changer_to_server_response_for_shoppings(
  state_changer_function,
  response_from_server
) {
  response_from_server.then((response) => {
    let status_code = response[0];
    let server_message = response[1];
    if (status_code === 401) {
      state_changer_function({ app_state: "unlogged" });
    } else if (status_code > 199 && status_code < 300) {
      state_changer_function({ app_state: "refreshing" });
    } else if (status_code === 409) {
      notifications(server_message, "warning");
      state_changer_function({ app_state: "default" });
    } else {
      notifications(server_message, "error");
      state_changer_function({ app_state: "default" });
    }
  });
}

export function fetch_function({
  endpoint,
  method,
  product_data,
  authorization_code,
}) {
  console.log("----");
  console.log(authorization_code);
  console.log("----");
  let endpoint_url;
  if (method === "POST") {
    endpoint_url = url + endpoint;
  }
  if (method === "DELETE" || method === "PUT") {
    endpoint_url = url + endpoint + product_data.id;
  }
  let promise = fetch(endpoint_url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: method,
    body: JSON.stringify(product_data),
  })
    .then((response) => {
      //let result = status_code_translator(response.status);
      return response.json().then((json) => {
        console.log(response.status);
        return [response.status, json.response];
      });
    })
    .catch(() => {
      console.log("Catched unknown error");
      return ["Unknown_error", "Unknown error"];
    });
  return promise;
}

/*FUNKCJA TYLKO DLA SKANERA*/

export function send_to_server(
  url,
  product_to_send,
  method,
  session_code,
  component
) {
  let server_address = url;
  if (method == "POST") {
    server_address = server_address;
  } else if (method == "PUT" || method == "DELETE" || method == "PATCH") {
    let id_of_product = product_to_send.id;
    server_address = server_address + id_of_product;
  }

  let promise = fetch(server_address, {
    headers: {
      "Content-Type": "application/json",
      Authorization: session_code,
      Active_component: component,
    },
    method: method,
    body: JSON.stringify(product_to_send),
  }).then((response) => {
    return response;
  });

  return promise;
}
