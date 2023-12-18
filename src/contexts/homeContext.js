import { createContext, useEffect, useState } from "react";

export const HomeContext = createContext({
  home: { id: String, name: String },
  setHome: () => {},
});

export const HomeContextProvider = ({ children }) => {
  const [home, setHome] = useState(null);

  useEffect(() => {
    console.log("Home Context changed to: ", home);
  }, [home]);

  return (
    <div>
      <HomeContext.Provider value={{ home, setHome }}>
        {children}
      </HomeContext.Provider>
    </div>
  );
};
