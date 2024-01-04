import React, { useContext } from "react";
import { SiAddthis } from "react-icons/si";
import { APP_STATES } from "../../applicationStates";
import {
  extractIdFromLocation,
  serverResponseTranslator,
} from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { addHome } from "../../services/home";
import "../commonComponents/BottomNavbarButtons.css";
import { HomeContext } from "../../contexts/homeContext";

const AddHomeButton = () => {
  const sessionCode = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  const onClickHandler = async () => {
    const name = ask_home_name();
    if (!name) {
      return;
    }
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const response = addHome({ name }, sessionCode);
    serverResponseTranslator(messages, response)
      .then((r) => r.headers.get("Location"))
      .then((l) => {
        const id = extractIdFromLocation(l);
        console.log('location', l)
        homeContext.addHomeToState({ id, name });
      })
      .then(() => {
        appContext.setAppState(APP_STATES.DEFAULT);;
      });
  };

  return (
    <div className="col text-center ">
      <button
        className="bottom_navbar_buttons"

        disabled={appContext.appState !== APP_STATES.DEFAULT}
        onClick={onClickHandler}
      >
        <SiAddthis /> Add Home
      </button>
    </div>
  );
};

const messages = {
  success: "Home added",
  duplicated: "Home already exists",
  unknown: "Unknown error",
};

function ask_home_name() {
  const name = prompt("Home name");
  return name === "" ? null : name;
}

export default AddHomeButton;
