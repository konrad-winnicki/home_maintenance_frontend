import React, { useContext } from "react";
import Home from "./Home";
import { ScrollableList } from "../commonComponents/ScrollableList";
import SwipeRightProvider from "../../contexts/SwipeRight.js";
import { HomeContext } from "../../contexts/homeContext";

export default function HomeList(props) {
  const homeContext = useContext(HomeContext);
  
  return (
    <>
      <div className=" header mt-10">Your homes:</div>
      {!homeContext.home ? (
        <div style={{ textAlign: "center" }}>choose home you wish to enter</div>
      ) : (
        ""
      )}
      <ScrollableList>
        {props.homes.map((h) => (
          <SwipeRightProvider key={h.id}>
            <Home home={h} />
          </SwipeRightProvider>
        ))}
      </ScrollableList>
    </>
  );
}
