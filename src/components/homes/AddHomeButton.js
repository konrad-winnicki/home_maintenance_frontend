import React, { useContext } from "react";
import { APP_STATES } from "../../applicationStates";
import {
  extractIdFromLocation,
  serverResponseResolver,
  errorHandler,
  notificator,
} from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { addHome } from "../../services/home";
import "../commonComponents/BottomNavbarButtons.css";
import { HomeContext } from "../../contexts/homeContext";
import { logOut } from "../../services/loginAuxilaryFunctions";

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

    const notificatorMessages = {
      success: `${name} has been added`,
      duplicated: `Home ${name} already exists`,
      unknown: "Unknown error",
    };

    addHome({ name }, sessionCode)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          const actions = {
            201: () => {
              const id = extractIdFromLocation(result.location);
              homeContext.addHomeToState({ id, name });
            },
            401: () => {
              logOut();
            },
          };
          errorHandler(result.statusCode, actions);
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
    <div className="col text-center">
      <button
        className="bottom_navbar_buttons"
        disabled={appContext.appState !== APP_STATES.DEFAULT}
        onClick={onClickHandler}
      >
        Add Home
      </button>
    </div>
  );
};

function ask_home_name() {
  const name = prompt("Home name");
  return name === "" ? null : name;
}

export default AddHomeButton;
