import React, { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";

export const BottomNavBar = ({ children }) => {
const appContext = useContext(AppContext)
  const brightness = appContext.showPrompt === APP_STATES.SHOW_PROMPT? "brightness(0.8)": ""

  return (
    <div className="mr-0 ml-0 pt-3 pb-3  pr-0 pl-0 d-flex 
        justify-content-between sticky-bottom"
        style={{filter: `${brightness}`,
          backgroundColor: '#f6bd60', height: '70px', position: 'sticky-bottom'}}        >
         {children}
        </div>
  );
};
