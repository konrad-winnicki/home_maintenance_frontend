import React, { useContext } from "react";
import { APP_STATES } from "../../applicationStates";
import {
  notificator,
  serverResponseResolver,
  actionTaker,
} from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { joinHome } from "../../services/home";
import { getHomes } from "../../services/home";
import { HomeContext } from "../../contexts/homeContext";

import "../commonComponents/BottomNavbarButtons.css";

// TODO: remove duplication
const JoinHomeButton = () => {
  const sessionCode = localStorage.getItem("session_code");
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  const onClickHandler = async () => {
    const homeId = promptForHomeId();
    if (!homeId) {
      return;
    }

    const notificatorMessages = {
      success: "Joined new home",
      duplicated: "You belong to this home",
      unknown: "Unknown error",
    };
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    joinHome(homeId, sessionCode)
      .then((response) => {
        return serverResponseResolver(response).then(() => {
          return getHomes(sessionCode).then((response) => {
            return serverResponseResolver(response).then((result) => {
              actionTaker(result.statusCode, () => {
                homeContext.setHomes(result.body);
              });
              notificator(result.statusCode, notificatorMessages);
            });
          });
        });
      })
      .catch((error) => {
        if (error.statusCode) {
          notificator(error.statusCode, notificatorMessages);
        } else {
          console.log(error);
        }
      });

    appContext.setAppState(APP_STATES.DEFAULT);
  };

  return (
    <div className="col text-center ">
      <button
        className="bottom_navbar_buttons"
        disabled={appContext.appState !== APP_STATES.DEFAULT}
        onClick={onClickHandler}
      >
        Join Home
      </button>
    </div>
  );
};

function promptForHomeId() {
  const homeId = prompt("Give home invitation id:");
  return homeId === "" ? null : homeId;
}

export default JoinHomeButton;
