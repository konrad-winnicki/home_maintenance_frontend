import { createContext, useEffect, useState } from "react";

export const HomeContext = createContext({
  home: { id: String, name: String },
  homes: [{ id: String, name: String }],
  setHome: () => {},
  setHomes: () => {},
  addHomeToState: () => {},
  deleteHomeFromState: () => {},
});

export const HomeContextProvider = ({ children }) => {
  const [home, setHome] = useState(null);
  const [homes, setHomes] = useState([]);
  function addHomeToState(home) {
    setHomes((previousHomes) => [...previousHomes, home]);
  }

  function deleteHomeFromState(homeId) {
    setHomes((prevHomes) => {
      const filteredHomeList = prevHomes.filter((home) => home.id !== homeId);
      return filteredHomeList;
    });
  }
  useEffect(() => {
    console.log("Home Context changed to: ", home);
  }, [home, homes]);

  return (
    <div>
      <HomeContext.Provider
        value={{
          home,
          homes,
          setHome,
          setHomes,
          addHomeToState,
          deleteHomeFromState,
        }}
      >
        {children}
      </HomeContext.Provider>
    </div>
  );
};
