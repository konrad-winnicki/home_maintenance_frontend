import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { updateShoppingItem } from "../../services/cart";
import { SourceContext } from "../../contexts/sourceContext";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../commonComponents/NavigationBar";
import { serverResponseTranslator } from "../../auxilaryFunctions";


export default function CheckBox() {
  const session_code = localStorage.getItem("session_code");
  const shoppingItemContext = useContext(SourceContext);
  const appContext = useContext(AppContext);
  const [isBought, setBought] = useState(
    shoppingItemContext.source.is_bought
  );
  const initialRender = useRef(shoppingItemContext.source.is_bought);

  const handleChange = () => {
    console.log("HANDLE CHANGE CALLED");
    setBought(!isBought);
  };

  const updateItem = useCallback(() => {
    const shoppingItem = {
      id: shoppingItemContext.source.product_id,
      updatedValues: {
        ...shoppingItemContext.source,
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
  },[appContext,shoppingItemContext,isBought, session_code]);

  useEffect(() => {
    if (initialRender.current === isBought) {
      return;
    }
    updateItem();
  }, [isBought, updateItem]);

  return (
    <div>
      <input
        className="form-check-input"
        style={{ width: "25px", height: "25px" }}
        disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
        type="checkbox"
        defaultChecked={isBought}
        id="flexCheckIndeterminate"
        onChange={handleChange}
      ></input>
    </div>
  );
}
