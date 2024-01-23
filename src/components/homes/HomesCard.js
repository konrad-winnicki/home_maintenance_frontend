import React, { useContext, useEffect } from "react";
import HomeList from "./HomeList";
import { HomeContext } from "../../contexts/homeContext";
import AddHomeButton from "./AddHomeButton";
import JoinHomeButton from "./JoinHomeButton";
import { getHomes } from "../../services/home";
import { BottomNavBar } from "../commonComponents/BottomNavBar";
import {
  actionTaker,
  notificator,
  serverResponseResolver,
} from "../../services/auxilaryFunctions";
export default function HomesCard() {
  const sessionCode = localStorage.getItem("session_code");
  const homeContext = useContext(HomeContext);
  const notificatorMessages = {
    unknown: "Unknown error",
  };
  useEffect(() => {
    console.log("use effect homecard", homeContext.homes);
    getHomes(sessionCode)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          actionTaker(result.statusCode, () => {
            homeContext.setHomes(result.body);
          });
          notificator(result.statusCode, notificatorMessages);
        });
      })
      .catch((error) => {
        if (error.statusCode) {
          notificator(error.statusCode, notificatorMessages);
        } else {
          console.log(error);
        }
      });
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
