import React, { useContext } from "react";
import { SiAddthis } from "react-icons/si";
import { ask_product_name } from "../../auxilaryFunctions";
import { addProduct } from "../../services/store";
import { APP_STATES } from "../commonComponents/NavigationBar";
import { serverResponseTranslator } from "../../auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";

const AddProductButton = () => {
  const session_code = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);

  const onClickHandler = async () => {
    let product_name = ask_product_name();
    let product_data = {
      name: product_name,
      quantity: 1,
    };
    if (!product_name) {
      return;
    }
    appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
    const response = addProduct(product_data, session_code)
      /*
   .then((response) => {
        const messages = {
          unlogged: "Not logged",
          success: "Product addded",
          duplicated: "Product already exists",
          unknown: "Unknown error",
        };
        console.log('gggggggggggggggggggggg')
        statusCodeTranslator(response, messages).then(()=>{
          this.props.state_changer({ app_state: 'refreshing'});
    
        })
        //this.props.state_changer({ app_state: 'refreshing'});
      // this.props.server_response_service(this.props.state_changer, response)

      })
      */
      .catch((error) => console.log(error));
    const messages = {
      unlogged: "Not logged",
      success: "Product addded",
      duplicated: "Product already exists",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      appContext.stateChanger({ appState: APP_STATES.REFRESHING });
    });
  };

  return (
    <button
      className="btn btn-warning btn-sm"
      disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
      onClick={() => onClickHandler()}
    >
      <SiAddthis /> product
    </button>
  );
};

export default AddProductButton;
