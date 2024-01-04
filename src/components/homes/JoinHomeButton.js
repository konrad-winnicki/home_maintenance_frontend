import React, { useContext } from "react";
import { SiAddthis } from "react-icons/si";
import { APP_STATES } from "../../applicationStates";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { joinHome } from "../../services/home";
import "../commonComponents/BottomNavbarButtons.css";

// TODO: remove duplication
const JoinHomeButton = () => {
  const sessionCode = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);

  const onClickHandler = async () => {
    const homeId = promptForHomeId();
    if (!homeId) {
      return;
    }
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const response = joinHome(homeId, sessionCode);
    const messages = {
      success: "Joined new home",
      duplicated: "You belong to this home",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      appContext.setAppState(APP_STATES.REFRESHING);
    });
  };

  return (
    <div className="col text-center ">
      <button
        className="bottom_navbar_buttons"
        disabled={appContext.appState !== APP_STATES.DEFAULT}
        onClick={onClickHandler}
      >
        <SiAddthis /> Join Home
      </button>
    </div>
  );
};


function promptForHomeId() {
  const homeId = prompt("Give home invitation id:");
  return homeId === "" ? null : homeId;
}

export default JoinHomeButton;
