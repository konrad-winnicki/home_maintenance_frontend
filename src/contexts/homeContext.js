import { createContext, useEffect, useState } from "react";

export const HomeContext = createContext({
  home: { id: String, name: String },
  homes: [{ id: String, name: String }],
  setHome: () => {},
  setHomes: () => {},

  addHomeToState: () => {},
});

export const HomeContextProvider = ({ children }) => {
  const [home, setHome] = useState(null);
  const [homes, setHomes] = useState([]);
  function addHomeToState(home) {
    setHomes([...homes, home]);
  }

  useEffect(() => {
    console.log("Home Context changed to: ", home);
  }, [home]);

  return (
    <div>
      <HomeContext.Provider value={{ home, homes, setHome, setHomes, addHomeToState }}>
        {children}
      </HomeContext.Provider>
    </div>
  );
};
