import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { updateShoppingItem } from "../../services/cart";
import { ResourceContext } from "../../contexts/ResourceContext";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";

export default function CheckBox() {
  const session_code = localStorage.getItem("session_code");
  const shoppingItemContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const [isBought, setBought] = useState(
    shoppingItemContext.resource.is_bought
  );
  const initialRender = useRef(shoppingItemContext.resource.is_bought);

  const handleChange = () => {
    console.log('change')

    setBought(!isBought);
    //updateItem(!isBought);

  };

  const updateItem = useCallback(() => {
    const shoppingItem = {
      id: shoppingItemContext.resource.product_id,
      updatedValues: {
        ...shoppingItemContext.resource,
        is_bought: isBought,
      },
    };
    appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
    const response = updateShoppingItem(shoppingItem, session_code);
    const messages = {
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      initialRender.current = isBought;
      appContext.stateChanger({ appState: APP_STATES.REFRESHING });
    });
  }, [appContext, shoppingItemContext, isBought, session_code]);

  
  useEffect(() => {
    if (initialRender.current === isBought) {
      return;
    }
    updateItem();
  }, [isBought,updateItem]);

  
  return (
    <div>
      <input
        className="form-check-input, button_surrounding"
        style={{ width: "25px", height: "25px" }}
        disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
        type="checkbox"
        checked={shoppingItemContext.resource.is_bought}
        id="flexCheckIndeterminate"
        onChange={()=>{handleChange()}}
      ></input>
    </div>
  );
}
