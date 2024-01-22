import React, { useContext} from "react";
import Home from "./Home";
import { ScrollableList } from "../commonComponents/ScrollableList";
import SwipeRightProvider from "../../contexts/SwipeRight.js";
import { HomeContext } from "../../contexts/homeContext";

export default function HomeList(props) {
  const homeContext = useContext(HomeContext);
  const homeId = homeContext.home?.id;
  const filteredHomeList = props.homes.filter((home) => {
    return home.id !== homeId;
  });
 
  return (
    <>
      <div className=" homeHeader mt-10">
        <div>Current home:</div>
      </div>
      <div className=" homeHeaderContainer mt-10">
        {homeContext.home ? (
          <Home home={homeContext.home}></Home>
        ) : (
          <div style={{ marginLeft: "5%", marginRight: "5%" }}>
            choose home you wish to enter
          </div>
        )}
      </div>

      <ScrollableList>
        {filteredHomeList.map((h) => (
          <SwipeRightProvider key={h.id}>
            <Home home={h} />
          </SwipeRightProvider>
        ))}
      </ScrollableList>
    </>
  );
}
