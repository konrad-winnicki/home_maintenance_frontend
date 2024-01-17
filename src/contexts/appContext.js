import { createContext, useEffect, useState } from "react";
import { APP_STATES } from "../applicationStates";

export const AppContext = createContext({
  appState: APP_STATES.DEFAULT,
  setAppState: () => {},
});

export const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState(APP_STATES.DEFAULT);

  useEffect(() => {
    console.log('APP STATE', appState);
  }, [appState]);

  return (
    <div>
      <AppContext.Provider value={{ appState, setAppState }}>
        {children}
      </AppContext.Provider>
    </div>
  );
};
