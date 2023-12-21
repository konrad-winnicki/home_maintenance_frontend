import React, { useContext } from "react";
import { SiAddthis } from "react-icons/si";
import { APP_STATES } from "../../applicationStates";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { AppContext} from "../../contexts/appContext";
import { addHome } from "../../services/home";

const AddHomeButton = () => {
  const sessionCode = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);

  const onClickHandler = async () => {
    const name = ask_home_name();
    if (!name) {
      return;
    }
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const response = addHome({ name }, sessionCode);

    const messages = {
      success: "Home added",
      duplicated: "Home already exists",
      unknown: "Unknown error",
    };

    serverResponseTranslator(messages, response).then(() => {
      appContext.setAppState(APP_STATES.REFRESHING);
    });
  };

  return (
    <div className="col text-center ">
      <button
        className="btn btn-warning btn-sm"
        disabled={appContext.appState !== APP_STATES.DEFAULT}
        onClick={onClickHandler}
      >
        <SiAddthis /> Home
      </button>
    </div>
  );
};

function ask_home_name() {
  const name = prompt("Indicate home name:");
  return name === "" ? null : name;
}

export default AddHomeButton;
