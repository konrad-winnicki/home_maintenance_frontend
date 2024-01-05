import { toast } from "react-toastify";
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
  if (new_name_from_user === "" || new_name_from_user == null) {
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

export function notifications(message, type) {
  console.log("dodalem notification o typie " + type);
  if (type === "success") {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
    });
  }
  if (type === "warning") {
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

export async function serverResponseTranslator(messages, response_from_server) {
  console.log("1 rrrr", response_from_server);
  return response_from_server.then((response) => {
    return response.json().then((body) => {
     
      const status_code = response.status;
      if (status_code > 199 && status_code < 300) {
        notifications(messages.success, "success");
        return Promise.resolve(response);
      } else if (status_code === 409) {
        notifications(messages.duplicated, "warning");
        return Promise.reject("duplication");
      } else if (status_code === 400 && body.QuantityViolation) {
        console.log('DDDDDDDDDDDDDD')
        return Promise.reject("QuantityViolation");
      } else {
        notifications(messages.unknown, "error");
        return Promise.reject("unknown error");
      }
    });
  });
}

export async function statusCodeTranslator(response, message) {
  const statusCode = response.status;
  if (statusCode === 401) {
    notifications(message.unlogged, "warning");
  } else if (statusCode > 199 && statusCode < 300) {
    console.log("weszlo");
    notifications(message.succces, "success");
  } else if (statusCode === 409) {
    notifications(message.duplicated, "warning");
  } else if (statusCode === 404) {
    notifications(message.unknown, "error");
  } else {
    notifications(message.unknown, "error");
  }
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
  if (method === "POST") {
  } else if (method === "PUT" || method === "DELETE" || method === "PATCH") {
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

export function extractIdFromLocation(location) {
  const regex = /\/([\w-]*)$/g;
  return regex.exec(location).slice(1)[0];
}
