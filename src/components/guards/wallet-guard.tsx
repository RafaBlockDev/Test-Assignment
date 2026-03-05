"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export function WalletGuard({ children }: { children: ReactNode }) {
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.replace("/connect");
    }
  }, [isConnected, isConnecting, router]);

  if (isConnecting) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-zinc-500">Checking wallet connection...</div>
      </div>
    );
  }

  if (!isConnected) {
    return null;
  }

  return <>{children}</>;
}
