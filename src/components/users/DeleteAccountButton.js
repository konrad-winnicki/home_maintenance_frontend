import React, { useContext } from "react";
import { deleteUser } from "../../services/user";
import "../ResourceComponent.css";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../../contexts/authorizationContext";

function DeleteAccountButton() {
  const appContext = useContext(AppContext);

  const sessionCode = localStorage.getItem("session_code");
  const authorizationContext = useContext(AuthorizationContext);
  const navigate = useNavigate();

  const deleteUserFromDB = () => {
    const confirmation = window.confirm(
      `You are going to delete your account!\n\nIf you are the last member of home all home data will be deleted permanently.`
    );
    if (!confirmation) {
      return null;
    }
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
    const response = deleteUser(sessionCode);

    const messages = {
      success: "Your account has been deleted",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response)
      .then(() => {
        localStorage.clear();
        authorizationContext.setLoggedIn(false);
        navigate("/accountDeleted");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        appContext.setAppState(APP_STATES.DEFAULT);
      });
  };

  return (
    <div className="col text-center">
      <div
        disabled={appContext.appState !== APP_STATES.DEFAULT}
        onClick={deleteUserFromDB}
      >
        Delete Account{" "}
      </div>
    </div>
  );
}

export default DeleteAccountButton;
