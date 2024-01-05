import { createContext } from "react";

export const ResourceContext = createContext({
  resource: {},
  modifyProductInState: () => {},
  deleteResourceFromState: () => {}

});
