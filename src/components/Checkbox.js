import { useState, useEffect, useRef } from "react";
import { change_product_properties_in_cart } from "../services/cart";
export default function CheckBox(props) {
  const [checkbox_status, setChecked] = useState(props.checkbox_status);
  const initialRender = useRef(true)
  const session_code = localStorage.getItem("session_code");

  const handleChange = () => {
    console.log("HANDLE CHANGE CALLED");
    setChecked(!checkbox_status);
  };


  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    console.log("CHECBOX use effect - retrieving");
    let product_data = {
      id: props.product.product_id,
      quantity: props.product.quantity,
      name: props.product.name,
      checkout: checkbox_status,
    };
    let result = change_product_properties_in_cart(
      product_data,
      session_code
    );
    props.server_response_service(props.state_changer, result);

   
  }, [checkbox_status, props, session_code]);

  return (
    <div>
      <input
        className="form-check-input"
        style={{ width: "25px", height: "25px" }}
        disabled={props.app_state !== "default" ? true : false}
        type="checkbox"
        defaultChecked={checkbox_status}
        id="flexCheckIndeterminate"
        onChange={handleChange}
      ></input>
    </div>
  );
}
