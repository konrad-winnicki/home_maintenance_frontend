import React, { useContext, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { addShoppingItem } from "../services/cart";
import { APP_STATES } from "./Dashboard";
import { AppContext } from "../contexts/appContext";
import { server_response_service } from "../functions";
const AddItemToShoppings = () => {
  const [shoppingItem, setShoppingItem] = useState({ name: "", quantity: "" });
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);

  const handleChangeName = (event) => {
    setShoppingItem({
      quantity: shoppingItem.quantity,
      name: event.target.value,
    });
  };
  const handleChangeQuantity = (event) => {
    setShoppingItem({ name: shoppingItem.name, quantity: event.target.value });
  };

  const add_product = () => {
    let product_data = {
      name: shoppingItem.name,
      quantity: shoppingItem.quantity,
    };
    appContext.stateChanger({ appState: APP_STATES.ONCLICK});

    let response = addShoppingItem(product_data, session_code);
    const messages = {
      unlogged: "Not logged",
      success: "Shopping item addded",
      duplication: "Shopping item already exists",
      unknown: "Unknown error",
    };
    server_response_service(messages, response).then(() => {
      appContext.stateChanger({ appState: APP_STATES.REFRESHING });
      setShoppingItem({ name: "", quantity: "" });

    });
  };

  return (
    <React.Fragment>
      <div className="col text-center">
        <input
          value={shoppingItem.name}
          disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
          className="form-control input-lg"
          type="text"
          placeholder="Type product name"
          onChange={handleChangeName}
        ></input>
      </div>
      <div className="col text-center">
        <input
          value={shoppingItem.quantity}
          disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
          className="form-control input-lg"
          type="number"
          placeholder="Quantity"
          onChange={handleChangeQuantity}
        ></input>
      </div>
      <div className="col text-left">
        <button
          disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
          className="btn btn-primary"
          onClick={() => {
            appContext.stateChanger({
              appState: APP_STATES.AWAITING_API_RESPONSE,
            });
            add_product();
          }}
        >
          <MdAddBox />
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddItemToShoppings;
