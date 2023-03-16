
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

  if (product == "" || product == null) {
    return null;
  } else {
    return product;
  }
}



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

  /*
        if (response_code > 199 && response_code < 300) {
          return Promise.resolve(response);
        }
        else if (response_code === 409) {
          return Promise.reject(response_code)
        }
        else if (response_code === 404) { return Promise.reject(response_code) }
        else if (response_code === 422) {
          return Promise.reject(new Error("You don't have this product on the list"))
        }
        
        else {
       
          return Promise.reject(new Error("Unknown error.Status code:" + response_code))
        }
      })
      .catch(Error =>{return Promise.reject(Error)})
*/
  return promise;
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

export function change_name(
  product,
  session_code,
  
  fetch_function
) {
  let new_name = ask_new_name();
  if (new_name != null) {
    let product_data = {
      id: product.product_id,
      quantity: product.quantity,
      name: new_name,
    };
    let result = fetch_function(product_data, session_code)
    return result;
  } else {
    return null;
  }
}

export function change_quantity(
  product,
  session_code,
  fetch_function
) {
  let quantity = custom_quantity();
  if (quantity != null) {
    let product_data = {
      id: product.product_id,
      quantity: quantity,
      name: product.name,
    };

    let result = fetch_function(product_data, session_code)
    return result;
  } else {
    return null;
  }
}

export function change_state_with_resolved_promise (result, state_changer_function) {
  if (result != null) {
    result.then((result) => {
      state_changer_function({
        status_code: result[0],
        message_from_server: result[1],
      });
    });
    console.log("RESUL", result)
  } else {
    state_changer_function({ app_state: "default" });
  }
}


