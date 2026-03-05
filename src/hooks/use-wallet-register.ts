"use client";

import { useState, useCallback } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useWalletContext } from "@/context/wallet-context";
import { toast } from "sonner";
import type { NonceResponse } from "@/types/wallet";

export function useWalletRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const { address, chain } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { setIsVerified, setWalletRegistered } = useWalletContext();

  const register = useCallback(async () => {
    if (!address || !chain) {
      toast.error("Wallet not connected");
      return;
    }

    setIsLoading(true);

    try {
      const nonceRes = await fetch(`/api/nonce?address=${address}`);
      if (!nonceRes.ok) {
        toast.error("Failed to get nonce");
        return;
      }
      const { message } = (await nonceRes.json()) as NonceResponse;

      let signature: string;
      try {
        signature = await signMessageAsync({ message });
      } catch {
        toast.error("Signature rejected");
        return;
      }

      const registerRes = await fetch("/api/wallet/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          chainId: chain.id,
          signature,
          message,
        }),
      });

      if (registerRes.status === 409) {
        toast.error("Wallet already registered");
        setWalletRegistered(true);
        setIsVerified(true);
        return;
      }

      if (!registerRes.ok) {
        const err = await registerRes.json();
        toast.error(err.error || "Registration failed");
        return;
      }

      setIsVerified(true);
      setWalletRegistered(true);
      toast.success("Wallet verified and registered");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [address, chain, signMessageAsync, setIsVerified, setWalletRegistered]);

  return { register, isLoading };
}
