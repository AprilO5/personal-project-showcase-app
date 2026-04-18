import { createContext, useContext } from "react";
import useBakeShopData from "../hooks/useBakeShopData";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const storeData = useBakeShopData();

  return (
    <StoreContext.Provider value={storeData}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider.");
  }

  return context;
}
