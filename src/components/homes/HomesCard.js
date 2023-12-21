import { ToastContainer } from "react-toastify";
import NavigationBar from "../commonComponents/NavigationBar";
import HomeList from "./HomeList";
import { HomeContext } from "../../contexts/homeContext";
import AddHomeButton from "./AddHomeButton";
import JoinHomeButton from "./JoinHomeButton";
import { useContext, useState, useEffect } from "react";
import { getHomes } from "../../services/home";

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
    <div>
      {/* TODO: create a reusable frame component with common navigation, toast
      etc. */}
      <NavigationBar />
      <ToastContainer />
      <div className="container vh-100 vw-100 d-flex flex-column">
        <div className="flex-grow-3 mt-5 mb-8">
          <div className="header mt-10">
            Current home: {homeContext.home?.name}
          </div>
          {/* TODO: here is the place for the current "page" */}
          <HomeList homes={homes} />
          <div className="mr-0 ml-0 mt-3 pt-3 pb-3 pr-0 pl-0 bg-primary d-flex justify-content-between fixed-bottom">
            <AddHomeButton addHomeToState={addHomeToState} />
            <JoinHomeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
