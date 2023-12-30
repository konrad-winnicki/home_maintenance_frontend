import React from "react";
import Home from "./Home";

export default function HomeList({homes}) {

  return (
    <React.Fragment>
    <div className="flex-grow-1 mt-1 mb-8" flex-grow-1 style={{
      overflow: "auto",
      paddingBottom: "1%",
      marginBottom: "14%",
    }}>
      {homes.map((h) => (
        <Home key={h.id} home={h} />
      ))}
    </div>
    </React.Fragment>
  );
}
