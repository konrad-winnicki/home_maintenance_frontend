import React, { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
export const ScrollableList = ({ children }) => {
  const appContext = useContext(AppContext);

const blur = appContext.appState === APP_STATES.SCANNING? "Blur(3px)": "Blur(0px)"
  useEffect(()=>{
    console.log(appContext)
  },[appContext])
  return (
    <div
      className="flex-grow-1"
      style={{
        overflow: "auto",
        paddingTop: "3%",
        paddingBottom: "3%",
        marginBottom: "0%",
        filter: `${blur}`
      }}
    >
      {children}
    </div>
  );
};
