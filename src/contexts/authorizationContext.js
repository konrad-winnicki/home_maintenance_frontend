import { createContext, useEffect, useState } from "react";

export const AuthorizationContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);


  
  useEffect(() => {
    console.log("useeffect LOGIN", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div>
      <AuthorizationContext.Provider value={{ isLoggedIn, setLoggedIn }}>
        {children}
      </AuthorizationContext.Provider>
    </div>
  );
};
