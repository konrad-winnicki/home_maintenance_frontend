import React from "react";
import Home from "./Home";
import { ScrollableList } from "../commonComponents/ScrollableList";
import SwipeRightProvider from "../../contexts/SwipeRight.js";

export default function HomeList(props) {
  return (
    <ScrollableList>
      {props.homes.map((h) => (
          <SwipeRightProvider key={h.id}>
            <Home home={h} />
          </SwipeRightProvider>
      ))}
    </ScrollableList>
  );
}
