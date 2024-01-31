import { createContext, useEffect, useState } from "react";
import { APP_STATES } from "../applicationStates";

export const AppContext = createContext({
  appState: APP_STATES.DEFAULT,
  setAppState: () => {},
  setShowPrompt: ()=>{},
  showPrompt: null,
  setPromptData:()=>{},
  promptData: null
});

export const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState(APP_STATES.DEFAULT);
  const [showPrompt, setShowPrompt] = useState(null)
  const [promptData, setPromptData] =useState(null)

  useEffect(() => {
    if (appState === APP_STATES.DEFAULT){
      setPromptData(null)
      setShowPrompt(null)
    }
  }, [appState]);

  return (
    <div>
      <AppContext.Provider value={{promptData, setPromptData, appState, setAppState, showPrompt, setShowPrompt }}>
        {children}
      </AppContext.Provider>
    </div>
  );
};
