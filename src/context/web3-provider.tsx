"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { mainnet, sepolia } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { WagmiProvider, type Config } from "wagmi";
import { projectId, wagmiAdapter } from "@/config/wagmi";

const queryClient = new QueryClient();

const metadata = {
  name: "Wallet App",
  description: "Web3 Wallet Integration Demo",
  url: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
  icons: ["/favicon.ico"],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, sepolia],
  metadata,
  features: {
    analytics: false,
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
