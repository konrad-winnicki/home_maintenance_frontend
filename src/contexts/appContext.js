import { createContext } from "react";
import { APP_STATES } from "../applicationStates";
export const AppContext = createContext({
  appState: APP_STATES.DEFAULT,
  stateChanger: () => {},
});

/*
export const AppContextProvider = ({ children }) => {
  //const [isLoggedIn, setLoggedIn] = useState(false);
    const product = this.props.product
  
  return (
    <div>
      <AppContext.Provider
        value={children.props}
      >
        {children}
      </AppContext.Provider>
    </div>
  );
};

*/

