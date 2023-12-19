import { ToastContainer } from "react-toastify";
import NavigationBar from "../commonComponents/NavigationBar";
import HomeList from "./HomeList";
import AddHomeButton from "./AddHomeButton";
import { HomeContext } from "../../contexts/homeContext";
import React, { useContext } from "react";
import JoinHomeButton from "./JoinHomeButton"
export default function HomesCard() {

  const homeContext = useContext(HomeContext);


  return (
    <div>
      {/* TODO: create a reusable frame component with common navigation, toast
      etc. */}
      <NavigationBar />
      <ToastContainer />
      <div className="container vh-100 vw-100 d-flex flex-column">
        <div className="flex-grow-3 mt-5 mb-8">
          <div className="header mt-10">Current home: {homeContext.home?.name}</div>
          {/* TODO: here is the place for the current "page" */}
          <HomeList />
          <div className="mr-0 ml-0 mt-3 pt-3 pb-3 pr-0 pl-0 bg-primary d-flex justify-content-between fixed-bottom">
            <AddHomeButton />
            <JoinHomeButton />

          </div>
         
        </div>
      </div>
    </div>
  );
}
