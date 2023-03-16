const url = "https://localhost:5000/";

export function add_product_to_store(product_data, authorization_code) {
  let promise = fetch(url + "store/products/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
    body: JSON.stringify(product_data),
  })
  .then((response) => {
    if (response.status === 401) {
      this.props.state_changer({ login_status: "unlogged" });
    } 
    if (response.status === 500) {
      return null;
    }
    else {
      return response.json().then((json) => {
        return [response.status, json.response];
      });
    }
  })
  .catch(() => {
    return null;
  });
return promise;
}


export function add_shoppings_to_store(product_data, authorization_code) {
  let promise = fetch(url + "store/products/delivery/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "POST",
    body: JSON.stringify(product_data),
  })
  .then((response) => {
    if (response.status === 401) {
      this.props.state_changer({ login_status: "unlogged" });
    } 
    if (response.status === 500) {
      return null;
    }
    else {
      return response.json().then((json) => {
        return [response.status, json.response];
      });
    }
  })
  .catch(() => {
    return null;
  });
return promise;
}

export function delete_product_from_store(product_data, authorization_code) {
  let promise = fetch(url + "store/products/" + product_data.id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "DELETE",
    body: JSON.stringify(product_data),
  })
    .then((response) => {
      if (response.status === 401) {
        this.props.state_changer({ login_status: "unlogged" });
      } 
      if (response.status === 500) {
        return null;
      }
      else {
        return response.json().then((json) => {
          return [response.status, json.response];
        });
      }
    })
    .catch(() => {
      return null;
    });
  return promise;
}

export function change_product_properties_in_store(product_data, authorization_code) {
  let promise = fetch(url + "store/products/" + product_data.id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "PUT",
    body: JSON.stringify(product_data),
  })
    .then((response) => {
      if (response.status === 401) {
        this.props.state_changer({ login_status: "unlogged" });
      } 
      if (response.status === 500) {
        return null;
      }
      else {
        return response.json().then((json) => {
          return [response.status, json.response];
        });
      }
    })
    .catch(() => {
      return null;
    });
  return promise;
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
        this.props.state_changer({ login_status: "unlogged" });
      } else {
        console.log("res from function", response);
        return response;
      }
      if (response.status === 500) {
        return null;
      }
    })
    .catch(() => {
      return null;
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

