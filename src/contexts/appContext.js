import { createContext } from "react";
export const AppContext = createContext({
  appState: "DEFAULT",
  stateChanger: () => {},
});

/*
export const ProductContextProvider = ({ children }) => {
  //const [isLoggedIn, setLoggedIn] = useState(false);
    const product = this.props.product
  
  return (
    <div>
      <ProductContext.Provider
        value={{  }}
      >
        {children}
      </ProductContext.Provider>
    </div>
  );
};


*/
