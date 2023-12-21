import { useState, useEffect, useContext, useCallback } from "react";
import { getHomes } from "../../services/home";
import Home from "./Home";
import { APP_STATES } from "../../applicationStates";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { AppContext } from "../../contexts/appContext";
export default function HomeList() {
  const sessionCode = localStorage.getItem("session_code");
  const [homes, setHomes] = useState([]);
  const appContext = useContext(AppContext);

  const getHomes2 = useCallback(() => {
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const response = getHomes(sessionCode);
    response
      .then((response) => {
        response.json().then((json) => {
          setHomes(json);
        });
      })
      .catch((error) => console.log(error));

    const messages = {
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      appContext.setAppState(APP_STATES.DEFAULT);
    });
  }, [appContext, sessionCode]);

  useEffect(() => {
    getHomes2();
  }, []);

  useEffect(() => {
    if (appContext.appState === APP_STATES.REFRESHING) {
      getHomes2();
    }
  }, [getHomes2, appContext]);

  return (
    <div className="mt-4 mb-8">
      {homes.map((h) => (
        <Home key={h.id} home={h} />
      ))}
    </div>
  );
}
