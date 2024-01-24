import { oauthRedirectUri } from "../config";

import { toast } from "react-toastify";
export function askQuantity(string = "") {
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


export function askNameForBarcode() {
  let product = prompt("1. Indicate name for barcode. \n\n2. Scan barcode again.");
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

async function getResponseBody(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return null;
}

export async function serverResponseTranslator(messages, response_from_server) {
  return response_from_server.then((response) => {
    return getResponseBody(response).then((body) => {
      const location = response.headers.get("Location");
      const status_code = response.status;
      if (status_code > 199 && status_code < 300) {
        notifications(messages.success, "success");
        return Promise.resolve({ location, body });
      } else if (status_code === 409) {
        notifications(messages.duplicated, "warning");
        return Promise.reject("duplication");
      } else if (status_code === 400 && body.QuantityViolation) {
        return Promise.reject("QuantityViolation");
      } else if (status_code === 404) {
        return Promise.reject("ItemNotExists");
      } else if (status_code === 401) {
        window.location.href = oauthRedirectUri;
      } else {
        notifications(messages.unknown, "error");
        return Promise.reject("unknown error");
      }
    });
  });
}

export async function serverResponseResolver(response) {
  return getResponseBody(response).then((body) => {
    const location = response.headers.get("Location");
    const statusCode = response.status;
    if (statusCode > 199 && statusCode < 300){
     return Promise.resolve({ location, body, statusCode }
        )
    }
    return Promise.reject({statusCode})
  });
}

export function notificator(statusCode, messages) {
  if (statusCode === 401) {
    console.log("Unlogged");
  } else if (statusCode > 199 && statusCode < 300) {
    notifications(messages.success, "success");
  } else if (statusCode === 409) {
    console.log(messages.duplicated);
    notifications(messages.duplicated, "warning");
  } else if (statusCode === 404) {
    console.log("Not exists");
  } else if (statusCode === 400) {
    console.log("Bad request");
  }
  
  else {
    notifications(messages.unknown, "error");
  }
}

export function actionTaker(statusCode, action) {
  if (statusCode === 401) {
    window.location.href = oauthRedirectUri;
  } 
  else if (statusCode === 404){
    return Promise.reject(404)
  }
  else if (statusCode > 199 && statusCode < 300) {
    action();
    return;
  }
}



export async function statusCodeTranslator(response, message) {
  const statusCode = response.status;
  if (statusCode === 401) {
    notifications(message.unlogged, "warning");
  } else if (statusCode > 199 && statusCode < 300) {
    notifications(message.succces, "success");
  } else if (statusCode === 409) {
    notifications(message.duplicated, "warning");
  } else if (statusCode === 404) {
    notifications(message.unknown, "error")
  } 
  else {
    notifications(message.unknown, "error");
  }
}

export function extractIdFromLocation(location) {
  const regex = /\/([\w-]*)$/g;
  return regex.exec(location).slice(1)[0];
}
