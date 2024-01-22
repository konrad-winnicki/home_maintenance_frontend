import React, { useContext, useState, useEffect } from "react";
import HomeList from "./HomeList";
import { HomeContext } from "../../contexts/homeContext";
import AddHomeButton from "./AddHomeButton";
import JoinHomeButton from "./JoinHomeButton";
import { getHomes } from "../../services/home";
import { BottomNavBar } from "../commonComponents/BottomNavBar";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
export default function HomesCard() {
  const sessionCode = localStorage.getItem("session_code");
  const homeContext = useContext(HomeContext);

  useEffect(() => {
    console.log("use effect homecard", homeContext.homes);
    const response = getHomes(sessionCode);
    const messages = {
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response)
      .then((result) => {
        homeContext.setHomes(result.body);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      {/* TODO: create a reusable frame component with common navigation, toast
      etc. */}
      {/* TODO: here is the place for the current "page" */}

      <HomeList homes={homeContext.homes} />
      <BottomNavBar>
        <AddHomeButton />
        <JoinHomeButton />
      </BottomNavBar>
    </React.Fragment>
  );
}
