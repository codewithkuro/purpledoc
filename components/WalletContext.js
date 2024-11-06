import React, { createContext, useContext } from "react";
import { WalletClient } from "viem";

const WalletContext = createContext(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WagmiProvider");
  }
  return context;
};

export default WalletContext;
