import { useContext, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const value = {};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
