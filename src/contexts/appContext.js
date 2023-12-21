import { createContext, useEffect, useState } from "react";
import { APP_STATES } from "../applicationStates";
export const AppContext = createContext({
  appState: APP_STATES.DEFAULT,
  stateChanger: () => {},
});


export const AppContext2 = createContext({
  appState: APP_STATES.DEFAULT,
  setAppState: () => {},
});

export const AppContext2Provider = ({ children }) => {
  const [ appState, setAppState] = useState( APP_STATES.DEFAULT);


  useEffect(()=>{console.log(appState)},[appState])
  
  return (
    <div>
      <AppContext2.Provider
        value={{appState, setAppState}}
      >
        {children}
      </AppContext2.Provider>
    </div>
  );
};



