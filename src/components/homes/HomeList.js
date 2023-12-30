import React from "react";
import Home from "./Home";
import { ScrollableList } from "../commonComponents/ScrollableList";

export default function HomeList({ homes }) {
  return (
    <ScrollableList>
      {homes.map((h) => (
        <Home key={h.id} home={h} />
      ))}
    </ScrollableList>
  );
}
