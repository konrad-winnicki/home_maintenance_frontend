import { useState, useEffect } from "react";
import { getHomes } from "../../services/home";
import Home from "./Home";

export default function HomeList() {
  const sessionCode = localStorage.getItem("session_code");
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    getHomes(sessionCode)
      .then((response) => {
        response.json().then((json) => {
          setHomes(json);
        });
      })
      .catch((error) => console.log(error));
  }, [sessionCode]);

  return (
    <div className="mt-4 mb-8">
      {homes.map((h) => (
        <Home key={h.id} home={h} />
      ))}
    </div>
  );
}
