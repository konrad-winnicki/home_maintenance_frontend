import { useState, useCallback, useEffect } from "react";
import { getHomes } from "../../services/home";

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
    <>
      {homes.map((home) => (
        <li key={home.id}>{home.name}</li>
      ))}
    </>
  );
}
