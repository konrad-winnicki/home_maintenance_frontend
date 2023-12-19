import React, { useContext, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { addShoppingItem } from "../../services/cart";
import { APP_STATES } from "../../applicationStates";
import { AppContext } from "../../contexts/appContext";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
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

  const addShopping = () => {
    let product_data = {
      name: shoppingItem.name,
      quantity: shoppingItem.quantity,
    };

    appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
    const response = addShoppingItem(product_data, session_code);
    const messages = {
      success: "Shopping item addded",
      duplication: "Shopping item already exists",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      appContext.stateChanger({ appState: APP_STATES.DEFAULT });
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
