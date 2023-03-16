const url = "https://localhost:5000/";


export function add_item_to_shopping_list(product_data, authorization_code) {
    let promise = fetch(url + "cart/items/", {
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
          this.props.state_changer({ login_status: "unlogged" });
        } else {
          console.log("res from function", response);
          return response;
        }
       
      })
      .catch(() => {
        return null;
      });
    return promise;
  }

  export function change_product_properties_in_cart(product_data, authorization_code) {
    let promise = fetch(url + "cart/items/" + product_data.id, {
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

  export function delete_item_from_cart(product_data, authorization_code) {
    let promise = fetch(url + "cart/items/" + product_data.id, {
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


  export function add_finished_products_to_shopping_list(product_data, authorization_code) {
    let promise = fetch(url + "cart/items/shoppinglist", {
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

  /*
  export function change_name_in_cart(product_data, authorization_code) {
    let promise = fetch(url + "cart/items/" + product_data.id, {
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
  */