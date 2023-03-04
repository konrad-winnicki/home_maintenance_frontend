/*export function deleteProduct() {
  let product = prompt("Which product do you want to delete?", "")
  if (product === "" || product == null) {
    return null
  }

  try {
    
    let parent_node = document.querySelector("#" + product.replaceAll(" ", "")).parentNode
    let id_of_product = parent_node.id
    let product_data = {
      id: id_of_product
    }

    return product_data
  }

  catch (Error) {
    return Error
  }
}
*/

export function askQuantity(string = "") {
  //let string = string
  let quantity = prompt("Quantity" + string, "");
  if (quantity === null || quantity === ""){return null}
  if (isNaN(quantity)) {
    quantity = askQuantity(string = " must be a number!")
    return Math.abs(quantity)
  }
  else { return Number(Math.abs(quantity)) }
}


/*
export function ask_product_name(string = "") {
  let product = prompt("Product name" + string, "")
  let pattern = /[A-z]*/
  /*
  
  if (product == "" || product == null) {
    return null
  }
  if (product.match(pattern)[0] == "") {
    product = ask_product_name(string = " cannot start with digit");
    return product
  }
  else { return product }
}
*/

export function ask_product_name() {
  let product = prompt("Product name")

  if (product == "" || product == null) {
    return null
  }
  
  
  else { return product }
}


/*export function change_quantity(metoda, product_id) {
  let string = ""
  let quantity = askQuantity(string)
  if (quantity == null || quantity == "" ){
    return null
  }
  if (metoda === "decrease") { quantity = -quantity }

  let product_data = {
    id: product_id,
    quantity: quantity

  }
  return product_data}
*/
/*
export function add_product_manually() {
  let string = ""
  let product = ask_product_name(string)
  if (product === null) {
    return null;
  }

  let quantity = askQuantity(string)
  if (quantity === null) {
    return null
  }
  let product_data = {
    name: product,
    quantity: quantity
  }
  return product_data
}
*/



export function send_to_server(url, product_to_send, method, component) {
  
  let server_address = url
  if (method == 'POST') { server_address = server_address }
  else if (method == 'PUT' || method == "DELETE" || method == "PATCH") {
    let id_of_product = product_to_send.id;
    server_address = server_address + id_of_product
  }
  if (product_to_send != null) {
    let promise = fetch(server_address,
      {
        headers: { 'Content-Type': 'application/json', "Active_component": component },
        method: method,
        body: JSON.stringify(product_to_send)
      })
      .then(response => {
        
        let response_code = response.status
        
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

    return promise
  }
}

/*
export function change_name() {
  let name_to_change = prompt("Which product name want to change?", "")
  if (name_to_change == "" || name_to_change == null) { return null }
  try {
    let parent_node = document.querySelector("#" + name_to_change.replaceAll(" ", "")).parentNode
    let id_of_product = parent_node.id
    let new_name_from_user = prompt("Type NEW name?", "")
    if (new_name_from_user == '' || new_name_from_user == null) {
      return null
    }
    let product_data = {
      id: id_of_product,
      name_to_change: name_to_change,
      new_name: new_name_from_user
    }
    return product_data
  }
  catch (Error) {return undefined
    
  }
}
*/

export function change_name(product_id, session_code) {
    let new_name_from_user = prompt("Type NEW name?", "")
    if (new_name_from_user == '' || new_name_from_user == null) {
      return null
    }
    let product_data = {
      session_code :session_code,
      id: product_id,
      new_name: new_name_from_user
    }
    return product_data
  }

  export function custom_quantity() {
    let new_value_from_user = askQuantity('')
    if (new_value_from_user == '' || new_value_from_user == null) {
      return null
    }
    
    return new_value_from_user
  }

  
