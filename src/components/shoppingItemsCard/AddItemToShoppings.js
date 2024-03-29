import React, { useContext, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { addShoppingItem } from "../../services/cart";
import { APP_STATES } from "../../applicationStates";
import { AppContext } from "../../contexts/appContext";
import {
  serverResponseResolver,
  notificator,
} from "../../services/auxilaryFunctions";
import { HomeContext } from "../../contexts/homeContext";
import "../ResourceButtons.css";

const AddItemToShoppings = () => {
  const [shoppingItem, setShoppingItem] = useState({ name: "", quantity: "" });
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;
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
      category: 'other',
      quantity: parseInt(shoppingItem.quantity),
    };

    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const notificatorMessages = {
      success: "Shopping item addded",
      duplicated: "Shopping item already exists",
      unknown: "Unknown error",
    };

    addShoppingItem(product_data, homeId, session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          notificator(result.statusCode, notificatorMessages);
        });
      })
      .catch((error) => {
        console.log(error);
        notificator(500, notificatorMessages);
      })
      .finally(() => {
        setShoppingItem({ name: "", quantity: "" });
        appContext.setAppState(APP_STATES.DEFAULT);
      });
  };
  const blur =
  appContext.appState === APP_STATES.SCANNING ? "Blur(3px)" : "Blur(0px)";

  return (
    <div
      className=""
      style={{
        borderTop: "4px solid  #f6bd60",
        alignContent: "space-between",
        display: "flex",
        filter: appContext.appState === APP_STATES.SCANNING ? "Blur(3px)" : "Blur(0px)"
      }}
    >
      <div className=" px-4 my-3">
        <input
          value={shoppingItem.name}
          disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
          className="form-control input-lg"
          type="text"
          placeholder="Name"
          onChange={handleChangeName}
        ></input>
      </div>
      <div className=" text-center my-3">
        <input
          value={shoppingItem.quantity}
          disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
          className="form-control input-lg"
          type="number"
          placeholder="Quantity"
          onChange={handleChangeQuantity}
        ></input>
      </div>
      <div className="text-center m-3">
        <button
          disabled={
            shoppingItem.name === "" || shoppingItem.quantity === ""
              ? true
              : false
          }
          className="resource_button"
          style={{ padding: "10px", marginTop: "3px" }}
          onClick={() => {
            addShopping();
          }}
        >
          <MdAddBox />
        </button>
      </div>
    </div>
  );
};

export default AddItemToShoppings;
