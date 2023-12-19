import React, { useContext } from "react";
import { APP_STATES } from "../../applicationStates";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { joinToHome } from "../../services/home";
const JoinHomeButton = () => {
  const sessionCode = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);

  const onClickHandler = async () => {
    const homeId = askHomeId();
    if (!homeId) {
      return;
    }
    appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
    const response = joinToHome(homeId, sessionCode);
    const messages = {
      success: "Joined new home",
      duplicated: "You belongs to this home",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      appContext.stateChanger({ appState: APP_STATES.REFRESHING });
    });
    
  };

  return (
    <div className="col text-center ">
      <button
        className="btn btn-warning btn-sm"
        disabled={appContext.appState !== APP_STATES.DEFAULT}
        onClick={onClickHandler}
      >
        Join Home
      </button>
    </div>
  );
};



function askHomeId() {
  const homeId = prompt("Indicate home Id:");
  return homeId === "" ? null : homeId;
}

export default JoinHomeButton;
