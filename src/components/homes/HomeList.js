import React from "react";
import Home from "./Home";
import { ScrollableList } from "../commonComponents/ScrollableList";
import SwipeRightProvider from "../../contexts/SwipeRight.js";

export default function HomeList({ homes }) {
  return (
    <ScrollableList>
      {homes.map((h) => (
        <div key={h.id}>
          <SwipeRightProvider>
            <Home key={h.id} home={h} />
          </SwipeRightProvider>
        </div>
      ))}
    </ScrollableList>
  );
}
