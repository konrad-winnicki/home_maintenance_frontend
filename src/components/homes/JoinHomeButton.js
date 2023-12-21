import React, { useContext } from "react";
import { SiAddthis } from "react-icons/si";
import { APP_STATES } from "../../applicationStates";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { joinHome } from "../../services/home";

// TODO: remove duplication
const JoinHomeButton = () => {
  const sessionCode = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);

  const onClickHandler = async () => {
    const homeId = promptForHomeId();
    if (!homeId) {
      return;
    }
    appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
    const response = joinHome(homeId, sessionCode);
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
        <SiAddthis /> Join Home
      </button>
    </div>
  );
};

const messages = {
  success: "Joined new home",
  duplicated: "You belongs to this home",
  unknown: "Unknown error",
};

function promptForHomeId() {
  const homeId = prompt("Give home invitation id:");
  return homeId === "" ? null : homeId;
}

export default JoinHomeButton;
