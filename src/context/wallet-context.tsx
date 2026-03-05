"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface WalletContextType {
  isVerified: boolean;
  walletRegistered: boolean;
  setIsVerified: (v: boolean) => void;
  setWalletRegistered: (v: boolean) => void;
  reset: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const STORAGE_KEY = "wallet-app-state";

export function WalletContextProvider({ children }: { children: ReactNode }) {
  const [isVerified, setIsVerified] = useState(false);
  const [walletRegistered, setWalletRegistered] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setIsVerified(parsed.isVerified ?? false);
        setWalletRegistered(parsed.walletRegistered ?? false);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ isVerified, walletRegistered })
    );
  }, [isVerified, walletRegistered]);

  const reset = useCallback(() => {
    setIsVerified(false);
    setWalletRegistered(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <WalletContext.Provider
      value={{ isVerified, walletRegistered, setIsVerified, setWalletRegistered, reset }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWalletContext must be used within WalletContextProvider");
  return ctx;
}
