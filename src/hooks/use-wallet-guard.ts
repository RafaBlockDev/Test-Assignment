"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useWalletGuard() {
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.replace("/connect");
    }
  }, [isConnected, isConnecting, router]);

  return { isConnected, isConnecting };
}
