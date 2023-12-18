import { useContext } from "react";
import { HomeContext } from "../../contexts/homeContext";
import "./Home.css";

export default function Home({ home }) {
  const homeContext = useContext(HomeContext);
  const setHomeHandler = () => {
    homeContext.setHome(home);
  };
  return (
    <>
      <div className="name">
        <button className="button" onClick={setHomeHandler}>
          {home.name}
        </button>
      </div>
    </>
  );
}
