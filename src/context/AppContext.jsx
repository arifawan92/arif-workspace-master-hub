/*
PEOS OWNER CONSENT RULE v1.0
RULE: Har AI Agent / Code Builder jo is PEOS folder ko use kare 
      usay LAZMI hai ke wo pehle is file ko mukammal parhe.
SECURITY: Backup, Version Confirm, Vercel Check Lazmi
OWNER: Arif GM Sahib
*/
import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const value = {
    currentPage,
    setCurrentPage,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;