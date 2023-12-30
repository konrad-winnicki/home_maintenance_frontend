import React, { useContext, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { addShoppingItem } from "../../services/cart";
import { APP_STATES } from "../../applicationStates";
import { AppContext } from "../../contexts/appContext";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { HomeContext } from "../../contexts/homeContext";
const AddItemToShoppings = () => {
  const [shoppingItem, setShoppingItem] = useState({ name: "", quantity: "" });
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext)
  const homeId = homeContext.home.id
  const handleChangeName = (event) => {
    setShoppingItem({
      quantity: shoppingItem.quantity,
      name: event.target.value,
    });
  };
  const handleChangeQuantity = (event) => {
    setShoppingItem({ name: shoppingItem.name, quantity: event.target.value });
  };

  const addShopping = () => {
    let product_data = {
      name: shoppingItem.name,
      quantity: parseInt(shoppingItem.quantity),
    };

    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const response = addShoppingItem(product_data, homeId, session_code);
    const messages = {
      success: "Shopping item addded",
      duplicated: "Shopping item already exists",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      appContext.setAppState(APP_STATES.DEFAULT);
      setShoppingItem({ name: "", quantity: "" });
    });
  };

  return (
    <React.Fragment>
      <div className="col-6 text-center">
        <input
          value={shoppingItem.name}
          disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
          className="form-control input-lg"
          type="text"
          placeholder="Type product name"
          onChange={handleChangeName}
        ></input>
      </div>
      <div className="col-4 text-center">
        <input
          value={shoppingItem.quantity}
          disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
          className="form-control input-lg"
          type="number"
          placeholder="Quantity"
          onChange={handleChangeQuantity}
        ></input>
      </div>
      <div className="col-2 text-center">
        <button
          disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
          className="btn btn-primary"
          onClick={() => {
            addShopping();
          }}
        >
          <MdAddBox />
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddItemToShoppings;
