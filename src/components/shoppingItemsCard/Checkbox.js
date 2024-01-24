import { useRef, useContext } from "react";
import { updateShoppingItem } from "../../services/cart";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import {
  serverResponseResolver,
  notificator,
} from "../../services/auxilaryFunctions";
import { HomeContext } from "../../contexts/homeContext";
import "../ResourceButtons.css";

export default function CheckBox() {
  const session_code = localStorage.getItem("session_code");
  const shoppingItemContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home.id;
  const inputRef = useRef(shoppingItemContext.resource.is_bought);

  const handleChange = () => {
    updateItem(!shoppingItemContext.resource.is_bought);
  };

  const updateItem = (isBoughtState) => {
    const { product_id, ...resource_without_product_id } =
      shoppingItemContext.resource;

    const shoppingItem = {
      id: product_id,
      updatedValues: {
        ...resource_without_product_id,
        is_bought: isBoughtState,
      },
    };
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const notificatorMessages = {
      unknown: "Unknown error",
    };

    updateShoppingItem(shoppingItem, homeId, session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          notificator(result.statusCode, notificatorMessages);
        });
      })
      .catch((error) => {
        console.log(error);
        notificator(500, notificatorMessages);
      });

    appContext.setAppState(APP_STATES.DEFAULT);
  };

  return (
    <input
      ref={inputRef}
      style={{ width: "25px", height: "25px", paddingRight: "10px" }}
      disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
      type="checkbox"
      checked={shoppingItemContext.resource.is_bought}
      id="flexCheckIndeterminate"
      onChange={() => {
        handleChange();
      }}
    ></input>
  );
}
