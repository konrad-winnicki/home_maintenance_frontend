
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
  let product = prompt("Indicate name for barcode:");
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

export async function serverResponseResolver(response) {
  return getResponseBody(response).then((body) => {
    const location = response.headers.get("Location");
    const statusCode = response.status;
    return Promise.resolve({ location, body, statusCode });
  });
}

export function notificator(statusCode, messages) {
  if(statusCode > 199 && statusCode < 300){
    notifications(messages.success, "success")
    return
  }
  switch (statusCode) {
    case 409:
      console.log(messages.duplicated);
      notifications(messages.duplicated, "warning");
      break;
    default:
      notifications(messages.unknown, "error");
  }
}

export function errorHandler(statusCode, actions) {
  if (statusCode > 199 && statusCode < 300) {
    actions[statusCode]();
    return;
  }
  switch (statusCode) {
    case 401:
      actions[statusCode]();
      return;
    case 404:
      console.log("Not exists");
      throw new Error(404);
    case 400:
      console.log("Bad request");
      return;
    default:
      console.log("Unknown error");
  }
}



export function extractIdFromLocation(location) {
  const regex = /\/([\w-]*)$/g;
  return regex.exec(location).slice(1)[0];
}
