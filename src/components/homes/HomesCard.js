import React, { useContext, useState, useEffect  } from "react";
import HomeList from "./HomeList";
import { HomeContext } from "../../contexts/homeContext";
import AddHomeButton from "./AddHomeButton";
import JoinHomeButton from "./JoinHomeButton";
import { getHomes } from "../../services/home";
import { BottomNavBar } from "../commonComponents/BottomNavBar";

export default function HomesCard() {
  const sessionCode = localStorage.getItem("session_code");
  const [homes, setHomes] = useState([]);
  const homeContext = useContext(HomeContext);
  function addHomeToState(home) {
    setHomes([...homes, home]);
  }


  useEffect(() => {
    getHomes(sessionCode)
      .then(r => r.json())
      .then(json => setHomes(json))
      .catch((error) => console.log(error));
  }, [sessionCode]);

  return (
    <React.Fragment>
      {/* TODO: create a reusable frame component with common navigation, toast
      etc. */}
          <div className="header mt-10">
            Current home: {homeContext.home?.name}
          </div>
          {/* TODO: here is the place for the current "page" */}
          <HomeList homes={homes} />
          <BottomNavBar>
            <AddHomeButton addHomeToState={addHomeToState} />
            <JoinHomeButton />
          </BottomNavBar>
    </React.Fragment>
  );
}
