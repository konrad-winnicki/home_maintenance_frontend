import { useState, useEffect, useRef, useContext } from "react";
import { updateShoppingItem } from "../services/cart";
import { SourceContext } from "../contexts/sourceContext";
import { AppContext } from "../contexts/appContext";
import { APP_STATES } from "./NavigationBar";
export default function CheckBox() {
  const session_code = localStorage.getItem("session_code");
  const shoppingItemContext = useContext(SourceContext);
  const appContext = useContext(AppContext);
  const [checkbox_status, setChecked] = useState(
    shoppingItemContext.source.checkout
  );
  // const initialRender = useRef(true);

  const handleChange = () => {
    console.log("HANDLE CHANGE CALLED");
    setChecked(!checkbox_status);
  };
  /*
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      console.log('elo')
    return    }
    else if (!initialRender.current){
      console.log('dupa')

    }
  },[]);
*/

  useEffect(() => {
    console.log(checkbox_status, "render");
    console.log("CHECBOX use effect - retrieving");
    let shoppingItem = {
      id: shoppingItemContext.source.product_id,
      updatedValues: {
        ...shoppingItemContext.source,
        checkout: checkbox_status,
      },
    };
    updateShoppingItem(shoppingItem, session_code).catch((error) =>
      console.log(error)
    );
  }, [checkbox_status]);

  return (
    <div>
      <input
        className="form-check-input"
        style={{ width: "25px", height: "25px" }}
        disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
        type="checkbox"
        defaultChecked={checkbox_status}
        id="flexCheckIndeterminate"
        onChange={handleChange}
      ></input>
    </div>
  );
}
